package com.realfinal.toot.common.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Price {
    private static int[][] currentPrice = new int[32][2];   //현재가
    private static String[][] totalPrice = new String[32][2];   //시가총액
    private static String[][] priceDifferencce = new String[32][2];    //전일 대비 가격 증감
    private static String[][] rateDifference = new String[32][2];  //전일 대비 증가율
    private static String[] min52 = new String[32];    //52주 최저가
    private static String[] max52 = new String[32];    //52주 최고가
    private static String[][] per = new String[32][2]; //PER
    private static String[][] pbr = new String[32][2]; //PBR
    private static String[][] minCandle=new String[32][30]; //분봉
    private static int[] minState=new int[32];  //분봉의 시작 인덱스를 저장하는 배열
    private static int currentState = 0;
    private static int nextState = 1;

    private static final Map<String,Integer> stockIndex=Map.ofEntries(
            Map.entry("010950",0),
            Map.entry("005930",1),
            Map.entry("000660",2),
            Map.entry("035720",3),
            Map.entry("035420",4),
            Map.entry("034220",5),
            Map.entry("036570",6),
            Map.entry("251270",7),
            Map.entry("035760",8),
            Map.entry("041510",9),
            Map.entry("352820",10),
            Map.entry("090430",11),
            Map.entry("003490",12),
            Map.entry("005380",13),
            Map.entry("139480",14),
            Map.entry("028260",15),
            Map.entry("097950",16),
            Map.entry("000080",17),
            Map.entry("068270",18),
            Map.entry("207940",19),
            Map.entry("000720",20),
            Map.entry("047040",21),
            Map.entry("006360",22),
            Map.entry("096770",23),
            Map.entry("034020",24),
            Map.entry("015760",25),
            Map.entry("017670",26),
            Map.entry("030200",27),
            Map.entry("032640",28),
            Map.entry("051900",29),
            Map.entry("373220",30),
            Map.entry("000120",31)
    );

    public static int getStockIndex(String stockId) {
        return stockIndex.get(stockId);
    }
    public static void updateState() {
        currentState ^= 1;
        nextState ^= 1;
    }

    public void updateCurrentPrice(int index, int price) {
        this.currentPrice[index][nextState] = price;
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

    public static void updateMinCandle(String stockId, String[] candle) {
        int index=getStockIndex(stockId);

        minState[index] = (minState[index] + 29) % 30;
        minCandle[index][minState[index]] = candle[0];
    }

    public static List<String> getMinCandle(String stockId) {
        List<String> candle=new ArrayList<String>();
        int index=getStockIndex(stockId);

        for(int i=index;i<30;++i) {
            if(minCandle[index][i] != null) {
                candle.add(minCandle[index][i]);
            }
        }
        for(int i=0;i<index;++i) {
            if(minCandle[index][i] != null) {
                candle.add(minCandle[index][i]);
            }
        }

        return candle;
    }

//    public static void updatePrice(Output[] stockInfo) {
//        for(Output stock: stockInfo) {
//            int index=getStockIndex(stock.getStockId);
//            updateCurrentPrice(index,Integer.valueOf(stock.getStck_prpr));
//            updateTotalPrice(index,stock.getHts_avls);
//            updatePriceDifference(index,stock.getPrdy_vrss);
//            updateRateDifference(index,stock.getPrdy_ctrt);
//            updateMin52(index,stock.getW52_lwpr);
//            updateMax52(index,stock.get52_hgpr);
//            updatePer(index,stock.getPer);
//            updatePbr(index,stock.getPbr);
//        }
//    }
}
