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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class PriceUtil {

    private final UserRepository userRepository;
    private final UserStockRepository userStockRepository;

    private static final Map<String, Integer> stockIndex = Map.ofEntries(
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
    private static int[][] currentPrice = new int[32][2];   //현재가
    private static String[][] totalPrice = new String[32][2];   //시가총액
    private static String[][] priceDifferencce = new String[32][2];    //전일 대비 가격 증감
    private static String[][] rateDifference = new String[32][2];  //전일 대비 증가율
    private static Long[][] tradingVolume = new Long[32][2];    //누적 거래량
    private static String[] min52 = new String[32];    //52주 최저가
    private static String[] max52 = new String[32];    //52주 최고가
    private static String[][] per = new String[32][2]; //PER
    private static String[][] pbr = new String[32][2]; //PBR
    private static MinuteRes[][] minCandle = new MinuteRes[32][30]; //분봉
    private static DayWeekRes[][] dayCandle = new DayWeekRes[32][50];   //일봉
    private static DayWeekRes[][] weekCandle = new DayWeekRes[32][50];  //주봉
    private static int[] minState = new int[32];  //분봉의 시작 인덱스를 저장하는 배열
    private static volatile int currentState = 0;
    private static volatile int nextState = 1;

    public static int getStockIndex(String stockId) {
        return stockIndex.get(stockId);
    }

    public static void updateState() {
        currentState ^= 1;
        nextState ^= 1;
    }

    public static void updateCurrentPrice(int index, int price) {
        currentPrice[index][nextState] = price;
    }

    public static void updateTotalPrice(int index, String price) {
        totalPrice[index][nextState] = price;
    }

    public static void updatePriceDifference(int index, String difference) {
        priceDifferencce[index][nextState] = difference;
    }

    public static void updateRateDifference(int index, String difference) {
        rateDifference[index][nextState] = difference;
    }

    public static void updateTradingVolume(int index, Long volume) {
        tradingVolume[index][nextState] = volume;

    }

    public static void updateMin52(int index, String price) {
        min52[index] = price;
    }

    public static void updateMax52(int index, String price) {
        max52[index] = price;
    }

    public static void updatePer(int index, String newPer) {
        per[index][nextState] = newPer;
    }

    public static void updatePbr(int index, String newPbr) {
        pbr[index][nextState] = newPbr;
    }

    public static int getCurrentPrice(String stockId) {
        return currentPrice[getStockIndex(stockId)][currentState];
    }

    public static String getTotalPrice(String stockId) {
        return totalPrice[getStockIndex(stockId)][currentState];
    }

    public static String getPriceDifference(String stockId) {
        return priceDifferencce[getStockIndex(stockId)][currentState];
    }

    public static String getRateDifference(String stockId) {
        return rateDifference[getStockIndex(stockId)][currentState];
    }

    public static Long getTradingVolume(String stockId) {
        return tradingVolume[getStockIndex(stockId)][currentState];
    }

    public static String getMin52(String stockId) {
        return min52[getStockIndex(stockId)];
    }

    public static String getMax52(String stockId) {
        return max52[getStockIndex(stockId)];
    }

    public static String getPer(String stockId) {
        return per[getStockIndex(stockId)][currentState];
    }

    public static String getPbr(String stockId) {
        return pbr[getStockIndex(stockId)][currentState];
    }

    public static void updateMinCandle(MinutePriceRes minutePriceRes) {
        int index = getStockIndex(minutePriceRes.getCorp());

        // 슬라이딩 윈도우 적용: 2분 전 ~ 30분 전 데이터는 변동이 없으므로 31분 전 데이터만 1분 전 데이터로 변환
        minState[index] = (minState[index] + 29) % 30;
        if (minCandle[index][minState[index]] == null) {
            minCandle[index][minState[index]] = StockMapper.INSTANCE.toMinuteRes(
                minutePriceRes.getOutput2().get(0).getStck_cntg_hour(),
                minutePriceRes.getOutput2().get(0).getStck_prpr(),
                minutePriceRes.getOutput2().get(0).getCntg_vol());
        } else {
            minCandle[index][minState[index]].updateTime(
                minutePriceRes.getOutput2().get(0).getStck_cntg_hour());
            minCandle[index][minState[index]].updatePrice(
                minutePriceRes.getOutput2().get(0).getStck_prpr());
            minCandle[index][minState[index]].updateAmount(
                minutePriceRes.getOutput2().get(0).getCntg_vol());
        }
    }

    public static List<MinuteRes> getMinCandle(String stockId) {
        List<MinuteRes> candle = new ArrayList<MinuteRes>();
        int index = getStockIndex(stockId);

        for (int i = index; i < 30; ++i) {
            if (minCandle[index][i] != null) {
                candle.add(minCandle[index][i]);
            }
        }
        for (int i = 0; i < index; ++i) {
            if (minCandle[index][i] != null) {
                candle.add(minCandle[index][i]);
            }
        }

        return candle;
    }

    public static List<DayWeekRes> getDayCandle(String stockId) {
        return Arrays.stream(dayCandle[getStockIndex(stockId)]).toList();
    }

    public static List<DayWeekRes> getWeekCandle(String stockId) {
        return Arrays.stream(weekCandle[getStockIndex(stockId)]).toList();
    }

    public static void updateDayCandle(PeriodPriceRes periodPriceRes) {
        int index = getStockIndex(periodPriceRes.getCorp());
        List<PeriodPriceRes.Output2> candle = periodPriceRes.getOutput2();

        for (int i = 0; i < 50; ++i) {
            if (dayCandle[index][i] == null) {
                dayCandle[index][i] = StockMapper.INSTANCE.toDayWeekRes(
                    candle.get(i).getStck_bsop_date(), candle.get(i).getStck_oprc(),
                    candle.get(i).getStck_clpr(), candle.get(i).getStck_hgpr(),
                    candle.get(i).getStck_lwpr(), candle.get(i).getAcml_vol());
            } else {
                dayCandle[index][i].updateDate(candle.get(i).getStck_bsop_date());
                dayCandle[index][i].updateEndPrice(candle.get(i).getStck_clpr());
                dayCandle[index][i].updateStartPrice(candle.get(i).getStck_oprc());
                dayCandle[index][i].updateBestPrice(candle.get(i).getStck_hgpr());
                dayCandle[index][i].updateWorstPrice(candle.get(i).getStck_lwpr());
                dayCandle[index][i].updateAmount(candle.get(i).getAcml_vol());
            }
        }
    }

    public static void updateWeekCandle(PeriodPriceRes periodPriceRes) {
        int index = getStockIndex(periodPriceRes.getCorp());
        List<PeriodPriceRes.Output2> candle = periodPriceRes.getOutput2();

        for (int i = 0; i < 50; ++i) {
            if (weekCandle[index][i] == null) {
                weekCandle[index][i] = StockMapper.INSTANCE.toDayWeekRes(
                    candle.get(i).getStck_bsop_date(), candle.get(i).getStck_oprc(),
                    candle.get(i).getStck_clpr(), candle.get(i).getStck_hgpr(),
                    candle.get(i).getStck_lwpr(), candle.get(i).getAcml_vol());

            } else {
                weekCandle[index][i].updateDate(candle.get(i).getStck_bsop_date());
                weekCandle[index][i].updateEndPrice(candle.get(i).getStck_clpr());
                weekCandle[index][i].updateStartPrice(candle.get(i).getStck_oprc());
                weekCandle[index][i].updateBestPrice(candle.get(i).getStck_hgpr());
                weekCandle[index][i].updateWorstPrice(candle.get(i).getStck_lwpr());
                weekCandle[index][i].updateAmount(candle.get(i).getAcml_vol());
            }
        }
    }

    public static void updatePrice(CurrentPriceRes[] stockInfo) {
        for (CurrentPriceRes stock : stockInfo) {
            int index = getStockIndex(stock.getCorp());
            CurrentPriceRes.Output output = stock.getOutput();

            updateCurrentPrice(index, Integer.valueOf(output.getStck_prpr()));
            updateTotalPrice(index, output.getHts_avls());
            updatePriceDifference(index, output.getPrdy_vrss());
            updateRateDifference(index, output.getPrdy_ctrt());
            updateTradingVolume(index, Long.valueOf(output.getAcml_vol()));
            updateMin52(index, output.getW52_lwpr());
            updateMax52(index, output.getW52_hgpr());
            updatePer(index, output.getPer());
            updatePbr(index, output.getPbr());
        }
    }

    public UserValueRes calculateUserValue(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        Long stockValue = 0L;

        List<UserStock> userStockList = userStockRepository.findAllByUserAndBankruptcyNo(user,
            user.getBankruptcyNo());

        if (!userStockList.isEmpty()) {
            for (UserStock userStock : userStockList) {
                Integer currentPrice = getCurrentPrice(userStock.getStock().getId());
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
        UserValueRes userValueRes = calculateUserValue(userId);

        return userValueRes.getTotalValue() - userValueRes.getSeedMoney();
    }
}
