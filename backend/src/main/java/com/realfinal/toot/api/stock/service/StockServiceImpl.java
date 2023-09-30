package com.realfinal.toot.api.stock.service;

import com.realfinal.toot.api.stock.mapper.StockMapper;
import com.realfinal.toot.api.stock.request.StockReq;
import com.realfinal.toot.api.stock.response.*;
import com.realfinal.toot.common.exception.stock.StockNotFoundException;
import com.realfinal.toot.common.exception.user.MySQLSearchException;
import com.realfinal.toot.common.util.JwtProviderUtil;
import com.realfinal.toot.common.util.PriceUtil;
import com.realfinal.toot.db.entity.Execution;
import com.realfinal.toot.db.entity.Interest;
import com.realfinal.toot.db.entity.Stock;
import com.realfinal.toot.db.entity.User;
import com.realfinal.toot.db.entity.UserStock;
import com.realfinal.toot.db.repository.ExecutionRepository;
import com.realfinal.toot.db.repository.InterestRepository;
import com.realfinal.toot.db.repository.StockRepository;
import com.realfinal.toot.db.repository.UserRepository;
import com.realfinal.toot.db.repository.UserStockRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class StockServiceImpl implements StockService {

    private final JwtProviderUtil jwtProviderUtil;
    private final UserRepository userRepository;
    private final StockRepository stockRepository;
    private final InterestRepository interestRepository;
    private final UserStockRepository userStockRepository;
    private final ExecutionRepository executionRepository;
    private final PriceUtil priceUtil;


    /**
     * 주식 매수
     *
     * @param accessToken
     * @param stockReq    주식 종목번호 + 매수할 주식 수
     * @return 매수에 성공한 주식 수(잔고가 부족할 경우 매수를 신청한 주식 수보다 적게 구매)
     */
    @Transactional
    public Integer buyStock(String accessToken, StockReq stockReq) {
        log.info("StockServiceImpl_buyStock_start: " + accessToken + " " + stockReq.toString());
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        String stockId = stockReq.getStockId();
        Integer count = stockReq.getCount();
        Integer price = priceUtil.getCurrentPrice(stockId);
        Long totalPrice = Long.valueOf((long) price * count);
        Long cash = user.getCash();

        if (cash < totalPrice) {
            count = (int) (cash / price);
            if (count == 0) {
                log.info(
                    "StockServiceImpl_buyStock_end: lack of user cash - bought nothing -> return 0");
                return 0;
            }
            log.info("StockServiceImpl_buyStock_mid: lack of user cash - change count to " + count);
            totalPrice = Long.valueOf((long) price * count);
        }
        Stock stock = stockRepository.findById(stockId).orElseThrow(StockNotFoundException::new);

        UserStock userStock = userStockRepository.findByUserAndStockAndBankruptcyNo(user, stock,
            user.getBankruptcyNo());

        String userName = user.getName();
        Integer bankruptcyNo = user.getBankruptcyNo();
        String stockName = stock.getStockName();

        if (userStock == null) {
            log.info("StockServiceImpl_buyStock_mid: " + userName + "(" + bankruptcyNo
                + ") did not have stock deal with " + stockName);
            userStock = StockMapper.INSTANCE.toUserStock(user, stock, count, price);
            userStockRepository.save(userStock);
            log.info("StockServiceImpl_buyStock_mid: insert " + userStock);
        } else {
            Integer averagePrice = userStock.getAveragePrice();
            Integer hold = userStock.getHold();
            Long priceSum = Long.valueOf(
                (long) averagePrice * hold + totalPrice);
            hold += count;
            userStock.updateHold(count);
            averagePrice = (int) (priceSum / hold);
            userStock.updateAveragePrice(averagePrice);
            log.info("StockServiceImpl_buyStock_mid: update " + userName + "(" + bankruptcyNo
                + ")'s deal status with " + stockName
                + " - hold=" + hold + ", avrPrice=" + averagePrice);
        }
        cash -= totalPrice;
        user.updateCash(cash);
        log.info("StockServiceImpl_buyStock_mid: update " + userName + "'s cash to " + cash);
        Execution execution = StockMapper.INSTANCE.toExecution(stock, user, price, count, true);

        executionRepository.save(execution);
        log.info("StockServiceImpl_buyStock_mid: " +
            userName + "(" + bankruptcyNo + ") bounght " + count + stockName
            + "execution data inserted");

        log.info("StockServiceImpl_buyStock_end: return " + count);
        return count;
    }

    /**
     * 전체 주식의 주가 정보를 제공
     *
     * @param accessToken
     * @return [ 종목 번호, 종목명, 현재가, 전일 대비 등락가격, 전일 대비 등락률, 관심 종목으로 등록 여부 ] 리스트
     */
    public List<AllStockRes> showAll(String accessToken) {
        log.info("StockServiceImpl_showAll_start: " + accessToken);
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        List<Stock> stockList = stockRepository.findAll();
        List<AllStockRes> allStockResList = new ArrayList<>();

        for (Stock stock : stockList) {
            String stockId = stock.getId();
            Boolean liked = interestRepository.findByUserAndStock(user, stock) != null;
            Integer currentPrice = priceUtil.getCurrentPrice(stockId);
            String priceDifference = priceUtil.getPriceDifference(stockId);
            String rateDifference = priceUtil.getRateDifference(stockId);
            AllStockRes allStockRes = StockMapper.INSTANCE.toAllStockRes(stock, currentPrice,
                priceDifference, rateDifference, liked);
            allStockResList.add(allStockRes);
        }

        log.info("StockServiceImpl_showAll_end: return " + allStockResList);
        return allStockResList;
    }

    /**
     * 사용자의 평가액 계산
     *
     * @param accessToken
     * @return 시드머니, 계좌 잔고, 주식을 반영한 총 평가액
     */
    public UserValueRes calculateValue(String accessToken) {
        log.info("StockServiceImpl_calculateValue_start: " + accessToken);
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);

        UserValueRes userValueRes = priceUtil.calculateUserValue(userId);
        log.info("StockServiceImpl_calculateValue_end: return " + userValueRes);
        return userValueRes;
    }

    /**
     * 거래량 상위 10개 종목 조회
     *
     * @return [ 등수, 종목번호, 종목명, 현재가, 전일 대비 등락률 ] 리스트(10개)
     */
    public List<StockRankRes> rankByVolume() {
        log.info("StockServiceImpl_rankByVolume_start: no arguments");
        List<StockRankRes> stockRankResList = priceUtil.getRankByVolume();
        log.info("StockServiceImpl_rankByVolume_end: " + stockRankResList);
        return stockRankResList;
    }

    /**
     * 사용자가 등록한 관심 종목 목록 조회
     *
     * @param accessToken
     * @return [ 종목번호, 종목명, 현재가, 전일 대비 등락가격, 전일 대비 등락률 ] 리스트
     */
    public List<InterestRes> showInterest(String accessToken) {
        log.info("StockServiceImpl_showInterest_start: " + accessToken);
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        List<Interest> interestList = interestRepository.findAllByUser(user);
        if (interestList.isEmpty()) {
            String userName = user.getName();
            log.info("StockServiceImpl_showInterest_end: " + userName
                + " has no interest -> return null");
            return null;
        }
        List<InterestRes> interestResList = new ArrayList<>();

        for (Interest interest : interestList) {
            Stock stock = interest.getStock();
            String stockId = stock.getId();
            Integer currentPrice = priceUtil.getCurrentPrice(stockId);
            String priceDifference = priceUtil.getPriceDifference(stockId);
            String rateDifference = priceUtil.getRateDifference(stockId);
            InterestRes interestRes = StockMapper.INSTANCE.toInterestRes(stock, currentPrice,
                priceDifference, rateDifference);
            interestResList.add(interestRes);
        }

        log.info("StockServiceImpl_showInterest_end: " + interestResList);
        return interestResList;
    }

    /**
     * 상세 주식 조회
     *
     * @param stockId
     * @param accessToken
     * @return 종목명, 분봉 리스트, 일봉 리스트, 주봉 리스트, 시가총액, 현재가, 총 주식 수, 산업군, 세부 산업군, 52주 최저가, 52주 최고가, 상세설명,
     * 관심 종목 등록 여부
     */
    public SpecificStockRes getStockInfo(String stockId, String accessToken) {
        log.info("StockServiceImpl_getStockInfo_start: " + stockId + " " + accessToken);
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        Stock stock = stockRepository.findById(stockId).orElseThrow(MySQLSearchException::new);
        UserStock userStock = userStockRepository.findByUserAndStockAndBankruptcyNo(user, stock,
            user.getBankruptcyNo());
        Interest interest = interestRepository.findByUserAndStock(user, stock);
        Integer hold = userStock == null ? 0 : userStock.getHold();

        List<MinuteRes> minCandle = priceUtil.getMinCandle(stockId);
        List<DayWeekRes> dayCandle = priceUtil.getDayCandle(stockId);
        List<DayWeekRes> weekCandle = priceUtil.getWeekCandle(stockId);
        Integer currentPrice = priceUtil.getCurrentPrice(stockId);
        Integer min52 = priceUtil.getMin52(stockId);
        Integer max52 = priceUtil.getMax52(stockId);
        String totalPrice = priceUtil.getTotalPrice(stockId);
        SpecificStockRes specificStockRes = StockMapper.INSTANCE.toSpecificStockRes(stock,
            minCandle, dayCandle, weekCandle, totalPrice, currentPrice, min52, max52,
            interest != null, hold);
        log.info("StockServiceImpl_getStockInfo_end: " + specificStockRes);
        return specificStockRes;
    }

    /**
     * 사용자 보유 종목 조회
     *
     * @param accessToken
     * @return [ 종목번호, 종목명, 보유 주식 수, 평균단가, 현재가, 총 평가금액(보유 주식 수 * 현재가), 수익, 수익률 ] 리스트
     */
    public List<MyStockRes> myStocks(String accessToken) {
        log.info("StockServiceImpl_myStocks_start: " + accessToken);
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        List<UserStock> userStockList = userStockRepository.findAllByUserAndBankruptcyNo(user,
            user.getBankruptcyNo());

        String userName = user.getName();
        Integer bankruptcyNo = user.getBankruptcyNo();

        if (userStockList.isEmpty()) {
            log.info(
                "StockServiceImpl_myStocks_end: " + userName + "(" + bankruptcyNo
                    + ") has no stock -> return null");
            return null;
        }

        List<MyStockRes> myStockResList = new ArrayList<>();
        for (UserStock userStock : userStockList) {
            if (userStock.getHold() > 0) {
                //주식 정보
                Stock stock = userStock.getStock();
                String stockId = stock.getId();
                Integer currentPrice = priceUtil.getCurrentPrice(stockId);

                //사용자 보유 주식 정보
                Integer averagePrice = userStock.getAveragePrice();
                Integer hold = userStock.getHold();
                Long totalPrice = Long.valueOf((long) currentPrice * hold);
                Long profit = Long.valueOf((long) averagePrice * hold) - totalPrice;
                Double profitRate = Double.valueOf(
                    100.0 * (currentPrice - averagePrice) / averagePrice);

                //사용자가 보유 중인 주식 정보 반환
                MyStockRes myStockRes = StockMapper.INSTANCE.toMyStockRes(stock, hold, averagePrice,
                    currentPrice, totalPrice, profit, profitRate);
                myStockResList.add(myStockRes);
            }
        }

        log.info("StockServiceImpl_myStock_end: " + myStockResList);
        return myStockResList;
    }

    /**
     * 사용자 거래 내역
     *
     * @param accessToken
     * @return [ 거래일시, 매수여부, 종목번호, 종목명, 거래 주식 수, 거래가격, 총 거래가격 ] 리스트
     */
    public List<ExecutionRes> myAllExecution(String accessToken) {
        log.info("StockServiceImpl_myAllExecution_start: " + accessToken);
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        Integer bankruptcyNo = user.getBankruptcyNo();
        List<Execution> executionList = executionRepository.findAllByUserAndBankruptcyNo(user,
            bankruptcyNo);

        if (executionList.isEmpty()) {
            log.info("StockServiceImpl_myAllExecution_end: " + user.getName() + "("
                + bankruptcyNo + ") has no history -> return null");
            return null;
        }

        List<ExecutionRes> executionResList = new ArrayList<>();
        for (Execution execution : executionList) {
            executionResList.add(StockMapper.INSTANCE.toExecutionRes(execution,
                Long.valueOf((long) execution.getPrice() * execution.getAmount())));
        }

        log.info("StockServiceImpl_myAllExecution_end: " + executionResList);
        return executionResList;
    }

    /**
     * 사용자 보유 종목 회사별 조회
     *
     * @param accessToken
     * @param stockId
     * @return { 종목번호, 종목명, 보유 주식 수, 평균단가, 현재가, 총 평가금액(보유 주식 수 * 현재가), 수익, 수익률 }
     */
    public MyStockRes myStock(String accessToken, String stockId) {
        log.info("StockServiceImpl_myStocks_start: " + accessToken);
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        Stock stock = stockRepository.findById(stockId).orElseThrow(MySQLSearchException::new);
        UserStock userStock = userStockRepository.findByUserAndStockAndBankruptcyNo(user, stock,
            user.getBankruptcyNo());

        String userName = user.getName();
        Integer bankruptcyNo = user.getBankruptcyNo();

        if (userStock == null) {
            log.info(
                "StockServiceImpl_myStock_end: " + userName + "(" + bankruptcyNo
                    + ") has no stock -> return null");
            return null;
        }

        MyStockRes myStockRes = null;

        if (userStock.getHold() > 0) {
            //주식 정보
            Integer currentPrice = priceUtil.getCurrentPrice(stockId);

            //사용자 보유 주식 정보
            Integer averagePrice = userStock.getAveragePrice();
            Integer hold = userStock.getHold();
            Long totalPrice = Long.valueOf((long) currentPrice * hold);
            Long profit = Long.valueOf((long) averagePrice * hold) - totalPrice;
            Double profitRate = Double.valueOf(
                100.0 * (currentPrice - averagePrice) / averagePrice);

            //사용자가 보유 중인 주식 정보 반환
            myStockRes = StockMapper.INSTANCE.toMyStockRes(stock, hold, averagePrice,
                currentPrice, totalPrice, profit, profitRate);
        }

        log.info("StockServiceImpl_myStock_end: " + myStockRes);
        return myStockRes;
    }

    /**
     * 사용자 특정 주식 거래 내역
     *
     * @param stockId
     * @param accessToken
     * @return [ 거래일시, 매수여부, 종목번호, 종목명, 거래 주식 수, 거래가격, 총 거래가격 ] 리스트
     */
    public List<ExecutionRes> myExecution(String stockId, String accessToken) {
        log.info("StockServiceImpl_myExecution_start: " + stockId + " " + accessToken);
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        Stock stock = stockRepository.findById(stockId).orElseThrow(MySQLSearchException::new);
        List<Execution> executionList = executionRepository.findAllByUserAndBankruptcyNoAndStock(
            user,
            user.getBankruptcyNo(), stock);

        if (executionList.isEmpty()) {
            log.info("StockServiceImpl_myExecution_end: " + user.getName() + " has no history with "
                + stock.getStockName() + "-> return null");
            return null;
        }

        List<ExecutionRes> executionResList = new ArrayList<>();
        for (Execution execution : executionList) {
            executionResList.add(StockMapper.INSTANCE.toExecutionRes(execution,
                Long.valueOf((long) execution.getPrice() * execution.getAmount())));
        }

        log.info("StockServiceImpl_myExecution_end: " + executionResList);
        return executionResList;
    }

    /**
     * 주식 매도
     *
     * @param accessToken
     * @param stockReq    종목번호, 매도할 주식 수
     * @return 매도 성공한 주식 수(보유 주식보다 많은 주식을 판매하려는 경우 보유한 주식 수만 반환)
     */
    @Transactional
    public Integer sellStock(String accessToken, StockReq stockReq) {
        log.info("StockServiceImpl_sellStock_start: " + accessToken + " " + stockReq.toString());
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        String stockId = stockReq.getStockId();
        Stock stock = stockRepository.findById(stockId).orElseThrow(MySQLSearchException::new);
        Integer bankruptcyNo = user.getBankruptcyNo();
        UserStock userStock = userStockRepository.findByUserAndStockAndBankruptcyNo(user, stock,
            bankruptcyNo);
        Integer count = stockReq.getCount();

        String userName = user.getName();
        String stockName = stock.getStockName();
        if (userStock == null) {
            log.info(
                "StockServiceImpl_sellStock_end: " + userName + "(" + bankruptcyNo
                    + ") has never bought " + stockName + " -> return 0");
            return 0;
        } else if (userStock.getHold() < count) {
            Integer hold = userStock.getHold();
            log.info(
                "StockServiceImpl_sellStock_mid: " + userName + "(" + bankruptcyNo
                    + ") has less than " + count + stockName
                    + " stocks -> change count to " + hold);
            count = hold;
        }

        Integer price = priceUtil.getCurrentPrice(stockId);
        Long totalPrice = Long.valueOf((long) priceUtil.getCurrentPrice(stockId) * count);
        totalPrice *= 99685;
        totalPrice /= 100000;
        Integer hold = userStock.getHold() - count;
        userStock.updateHold(hold);
        log.info("StockServiceImpl_sellStock_mid: update " + userName + "("
            + bankruptcyNo + ")'s " + stockName + " hold to "
            + hold);
        Long cash = user.getCash() + totalPrice;
        user.updateCash(cash);
        log.info("StockServiceImpl_sellStock_mid: update " + userName + "("
            + bankruptcyNo + ")'s cash to " + cash);
        Execution execution = StockMapper.INSTANCE.toExecution(stock, user, price, count, false);

        executionRepository.save(execution);
        log.info("StockServiceImpl_sellStock_mid: add new history - " + execution);
        log.info("StockServiceImpl_sellStock_end: return " + count);
        return count;
    }

    /**
     * 관심 종목 추가/삭제
     *
     * @param stockId
     * @param accessToken
     * @return true(관심 종목 추가), false(관심 종목 삭제)
     */
    @Transactional
    public Boolean attributeInterest(String stockId, String accessToken) {
        log.info("StockServiceImpl_attributeInterest_start: " + stockId + " " + accessToken);
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        Stock stock = stockRepository.findById(stockId).orElseThrow(MySQLSearchException::new);
        Interest interest = interestRepository.findByUserAndStock(user, stock);

        String stockName = stock.getStockName();
        String userName = user.getName();
        if (interest == null) {
            log.info("StockServiceImpl_attributeInterest_mid: " + userName
                + " has no interest with " + stockName);
            interest = StockMapper.INSTANCE.toInterest(user, stock);
            interestRepository.save(interest);
            log.info("StockServiceImpl_attributeInterest_mid: add " + userName
                + "'s interest with " + stockName + " - " + interest);
            log.info("StockServiceImpl_attributeInterest_end: return true");
            return true;
        } else {
            interestRepository.delete(interest);
            log.info("StockServiceImpl_attributeInterest_mid: remove " + userName
                + "'s interest with " + stockName);
            log.info("StockServiceImpl_attributeInterest_end: return false");
            return false;
        }
    }
}
