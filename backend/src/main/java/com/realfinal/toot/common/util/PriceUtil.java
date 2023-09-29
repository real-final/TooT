package com.realfinal.toot.common.util;

import com.realfinal.toot.api.kis.response.CurrentPriceRes;
import com.realfinal.toot.api.kis.response.MinutePriceRes;
import com.realfinal.toot.api.kis.response.PeriodPriceRes;
import com.realfinal.toot.api.stock.mapper.StockMapper;
import com.realfinal.toot.api.stock.response.DayWeekRes;
import com.realfinal.toot.api.stock.response.MinuteRes;
import com.realfinal.toot.api.stock.response.UserValueRes;
import com.realfinal.toot.common.exception.user.MySQLSearchException;
import com.realfinal.toot.db.entity.User;
import com.realfinal.toot.db.entity.UserStock;
import com.realfinal.toot.db.repository.UserRepository;
import com.realfinal.toot.db.repository.UserStockRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class PriceUtil {

    private final UserRepository userRepository;
    private final UserStockRepository userStockRepository;

    private final Map<String, Integer> stockIndex = Map.ofEntries(
        Map.entry("010950", 0),
        Map.entry("005930", 1),
        Map.entry("000660", 2),
        Map.entry("035720", 3),
        Map.entry("035420", 4),
        Map.entry("034220", 5),
        Map.entry("036570", 6),
        Map.entry("251270", 7),
        Map.entry("005490", 8),
        Map.entry("000880", 9),
        Map.entry("352820", 10),
        Map.entry("090430", 11),
        Map.entry("003490", 12),
        Map.entry("005380", 13),
        Map.entry("139480", 14),
        Map.entry("028260", 15),
        Map.entry("097950", 16),
        Map.entry("000080", 17),
        Map.entry("068270", 18),
        Map.entry("207940", 19),
        Map.entry("000720", 20),
        Map.entry("047040", 21),
        Map.entry("006360", 22),
        Map.entry("096770", 23),
        Map.entry("034020", 24),
        Map.entry("015760", 25),
        Map.entry("017670", 26),
        Map.entry("030200", 27),
        Map.entry("032640", 28),
        Map.entry("051900", 29),
        Map.entry("373220", 30),
        Map.entry("000120", 31)
    );
    private Integer[][] currentPrice = new Integer[32][2];   //현재가
    private String[][] totalPrice = new String[32][2];   //시가총액
    private String[][] priceDifferencce = new String[32][2];    //전일 대비 가격 증감
    private String[][] rateDifference = new String[32][2];  //전일 대비 증가율
    private Long[][] tradingVolume = new Long[32][2];    //누적 거래량
    private Integer[] min52 = new Integer[32];    //52주 최저가
    private Integer[] max52 = new Integer[32];    //52주 최고가
    private String[][] per = new String[32][2]; //PER
    private String[][] pbr = new String[32][2]; //PBR
    private MinuteRes[][] minCandle = new MinuteRes[32][30]; //분봉
    private DayWeekRes[][] dayCandle = new DayWeekRes[32][50];   //일봉
    private DayWeekRes[][] weekCandle = new DayWeekRes[32][50];  //주봉
    private Integer[] minState = new Integer[32];  //분봉의 시작 인덱스를 저장하는 배열
    private volatile Integer currentState = 0;
    private volatile Integer nextState = 1;

    public Integer getStockIndex(String stockId) {
        return this.stockIndex.get(stockId);
    }

    public void updateState() {
        this.currentState ^= 1;
        this.nextState ^= 1;
    }

    public void updateCurrentPrice(int index, int price) {
        this.currentPrice[index][this.nextState] = price;
    }

    public void updateTotalPrice(int index, String price) {
        this.totalPrice[index][this.nextState] = price;
    }

    public void updatePriceDifference(int index, String difference) {
        this.priceDifferencce[index][this.nextState] = difference;
    }

    public void updateRateDifference(int index, String difference) {
        this.rateDifference[index][this.nextState] = difference;
    }

    public void updateTradingVolume(int index, Long volume) {
        this.tradingVolume[index][this.nextState] = volume;
    }

    public void updateMin52(int index, Integer price) {
        this.min52[index] = price;
    }

    public void updateMax52(int index, Integer price) {
        this.max52[index] = price;
    }

    public void updatePer(int index, String newPer) {
        this.per[index][this.nextState] = newPer;
    }

    public void updatePbr(int index, String newPbr) {
        this.pbr[index][this.nextState] = newPbr;
    }

    public Integer getCurrentPrice(String stockId) {
        return this.currentPrice[getStockIndex(stockId)][this.currentState];
    }

    public String getTotalPrice(String stockId) {
        return this.totalPrice[getStockIndex(stockId)][this.currentState];
    }

    public String getPriceDifference(String stockId) {
        return this.priceDifferencce[getStockIndex(stockId)][this.currentState];
    }

    public String getRateDifference(String stockId) {
        return this.rateDifference[getStockIndex(stockId)][this.currentState];
    }

    public Long getTradingVolume(String stockId) {
        return this.tradingVolume[this.getStockIndex(stockId)][this.currentState];
    }

    public Integer getMin52(String stockId) {
        return this.min52[this.getStockIndex(stockId)];
    }

    public Integer getMax52(String stockId) {
        return this.max52[this.getStockIndex(stockId)];
    }

    public String getPer(String stockId) {
        return this.per[this.getStockIndex(stockId)][this.currentState];
    }

    public String getPbr(String stockId) {
        return this.pbr[this.getStockIndex(stockId)][this.currentState];
    }

    public void updateMinCandle(MinutePriceRes minutePriceRes) {
        int index = this.getStockIndex(minutePriceRes.getCorp());

        if (this.minState[index] == null) {
            this.minState[index] = 0;
        }
        // 슬라이딩 윈도우 적용: 2분 전 ~ 30분 전 데이터는 변동이 없으므로 31분 전 데이터만 1분 전 데이터로 변환
        this.minState[index] = (this.minState[index] + 29) % 30;
        if (this.minCandle[index][this.minState[index]] == null) {
            this.minCandle[index][this.minState[index]] = StockMapper.INSTANCE.toMinuteRes(
                minutePriceRes.getOutput2().get(0).getStck_cntg_hour(),
                minutePriceRes.getOutput2().get(0).getStck_prpr(),
                minutePriceRes.getOutput2().get(0).getCntg_vol());
        } else {
            this.minCandle[index][this.minState[index]].updateTime(
                minutePriceRes.getOutput2().get(0).getStck_cntg_hour());
            this.minCandle[index][this.minState[index]].updatePrice(
                minutePriceRes.getOutput2().get(0).getStck_prpr());
            this.minCandle[index][this.minState[index]].updateAmount(
                minutePriceRes.getOutput2().get(0).getCntg_vol());
        }
    }

    public List<MinuteRes> getMinCandle(String stockId) {
        List<MinuteRes> candle = new ArrayList<MinuteRes>();
        int index = this.getStockIndex(stockId);

        for (int i = index; i < 30; ++i) {
            if (this.minCandle[index][i] != null) {
                candle.add(this.minCandle[index][i]);
            }
        }
        for (int i = 0; i < index; ++i) {
            if (this.minCandle[index][i] != null) {
                candle.add(this.minCandle[index][i]);
            }
        }

        return candle;
    }

    public List<DayWeekRes> getDayCandle(String stockId) {
        return Arrays.stream(this.dayCandle[this.getStockIndex(stockId)]).toList();
    }

    public List<DayWeekRes> getWeekCandle(String stockId) {
        return Arrays.stream(this.weekCandle[this.getStockIndex(stockId)]).toList();
    }

    public void updateDayCandle(PeriodPriceRes periodPriceRes) {
        int index = this.getStockIndex(periodPriceRes.getCorp());
        List<PeriodPriceRes.Output2> candle = periodPriceRes.getOutput2();

        for (int i = 0; i < 50; ++i) {
            if (this.dayCandle[index][i] == null) {
                this.dayCandle[index][i] = StockMapper.INSTANCE.toDayWeekRes(
                    candle.get(i).getStck_bsop_date(), candle.get(i).getStck_oprc(),
                    candle.get(i).getStck_clpr(), candle.get(i).getStck_hgpr(),
                    candle.get(i).getStck_lwpr(), candle.get(i).getAcml_vol());
            } else {
                this.dayCandle[index][i].updateDate(candle.get(i).getStck_bsop_date());
                this.dayCandle[index][i].updateEndPrice(candle.get(i).getStck_clpr());
                this.dayCandle[index][i].updateStartPrice(candle.get(i).getStck_oprc());
                this.dayCandle[index][i].updateBestPrice(candle.get(i).getStck_hgpr());
                this.dayCandle[index][i].updateWorstPrice(candle.get(i).getStck_lwpr());
                this.dayCandle[index][i].updateAmount(candle.get(i).getAcml_vol());
            }
        }
    }

    public void updateWeekCandle(PeriodPriceRes periodPriceRes) {
        int index = this.getStockIndex(periodPriceRes.getCorp());
        List<PeriodPriceRes.Output2> candle = periodPriceRes.getOutput2();

        for (int i = 0; i < 50; ++i) {
            if (this.weekCandle[index][i] == null) {
                this.weekCandle[index][i] = StockMapper.INSTANCE.toDayWeekRes(
                    candle.get(i).getStck_bsop_date(), candle.get(i).getStck_oprc(),
                    candle.get(i).getStck_clpr(), candle.get(i).getStck_hgpr(),
                    candle.get(i).getStck_lwpr(), candle.get(i).getAcml_vol());

            } else {
                this.weekCandle[index][i].updateDate(candle.get(i).getStck_bsop_date());
                this.weekCandle[index][i].updateEndPrice(candle.get(i).getStck_clpr());
                this.weekCandle[index][i].updateStartPrice(candle.get(i).getStck_oprc());
                this.weekCandle[index][i].updateBestPrice(candle.get(i).getStck_hgpr());
                this.weekCandle[index][i].updateWorstPrice(candle.get(i).getStck_lwpr());
                this.weekCandle[index][i].updateAmount(candle.get(i).getAcml_vol());
            }
        }
    }

    public void updatePrice(CurrentPriceRes[] stockInfo) {
        for (CurrentPriceRes stock : stockInfo) {
            int index = this.getStockIndex(stock.getCorp());
            CurrentPriceRes.Output output = stock.getOutput();

            this.updateCurrentPrice(index, Integer.parseInt(output.getStck_prpr()));
            this.updateTotalPrice(index, output.getHts_avls());
            this.updatePriceDifference(index, output.getPrdy_vrss());
            this.updateRateDifference(index, output.getPrdy_ctrt());
            this.updateTradingVolume(index, Long.valueOf(output.getAcml_vol()));
            this.updateMin52(index, Integer.parseInt(output.getW52_lwpr()));
            this.updateMax52(index, Integer.parseInt(output.getW52_hgpr()));
            this.updatePer(index, output.getPer());
            this.updatePbr(index, output.getPbr());
        }
    }

    public UserValueRes calculateUserValue(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        Long stockValue = 0L;

        List<UserStock> userStockList = userStockRepository.findAllByUserAndBankruptcyNo(user,
            user.getBankruptcyNo());

        if (!userStockList.isEmpty()) {
            for (UserStock userStock : userStockList) {
                Integer currentPrice = this.getCurrentPrice(userStock.getStock().getId());
                Long calculatedValue = Long.valueOf((long) currentPrice * userStock.getHold());
                stockValue += calculatedValue;
            }
        }

        Long cash = user.getCash();
        Long evaluatedValue = cash + stockValue;
        UserValueRes userValueRes = StockMapper.INSTANCE.toUserValueRes(user,
            evaluatedValue);
        return userValueRes;
    }

    public Long calNetProfit(Long userId) {
        UserValueRes userValueRes = this.calculateUserValue(userId);

        return userValueRes.getTotalValue() - userValueRes.getSeedMoney();
    }
}
