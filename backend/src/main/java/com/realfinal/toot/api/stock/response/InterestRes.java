package com.realfinal.toot.api.stock.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class InterestRes {

    private String stockId;
    private String stockName;
    private Integer currentPrice;
    private String priceDifference;
    private String rateDifference;

    @Builder
    public InterestRes(String stockId, String stockName, Integer currentPrice,
        String priceDifference,
        String rateDifference) {
        this.stockId = stockId;
        this.stockName = stockName;
        this.currentPrice = currentPrice;
        this.priceDifference = priceDifference;
        this.rateDifference = rateDifference;
    }
}
