package com.realfinal.toot.api.stock.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class SpecificStockRes {

    private String stockName;
    private List<MinuteRes> minCandle;
    private List<DayWeekRes> dayCandle;
    private List<DayWeekRes> weekCandle;
    private String totalPrice;
    private Integer currentPrice;
    private Long totalStock;
    private String industryClass;
    private String wics;
    private Integer min52;
    private Integer max52;
    private String outline;
    private Boolean interested;
    private String imageUrl;

    @Builder

    public SpecificStockRes(String stockName, List<MinuteRes> minCandle, List<DayWeekRes> dayCandle,
        List<DayWeekRes> weekCandle, String totalPrice, Integer currentPrice, Long totalStock,
        String industryClass, String wics, Integer min52, Integer max52, String outline,
        Boolean interested, String imageUrl) {
        this.stockName = stockName;
        this.minCandle = minCandle;
        this.dayCandle = dayCandle;
        this.weekCandle = weekCandle;
        this.totalPrice = totalPrice;
        this.currentPrice = currentPrice;
        this.totalStock = totalStock;
        this.industryClass = industryClass;
        this.wics = wics;
        this.min52 = min52;
        this.max52 = max52;
        this.outline = outline;
        this.interested = interested;
        this.imageUrl = imageUrl;
    }
}
