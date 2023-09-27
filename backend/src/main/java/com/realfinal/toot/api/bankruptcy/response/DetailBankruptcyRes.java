package com.realfinal.toot.api.bankruptcy.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class DetailBankruptcyRes {

    private Integer bankruptcyNo;
    private Long lastCash;
    private Long lastSeedMoney;
    private Long lastTotalAsset;
    private Long netIncome;
    private Double roi;
    @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime bankruptAt;

    @Builder
    public DetailBankruptcyRes(Integer bankruptcyNo, Long lastCash, Long lastSeedMoney,
        Long lastTotalAsset, Long netIncome, Double roi, LocalDateTime bankruptAt) {
        this.bankruptcyNo = bankruptcyNo;
        this.lastCash = lastCash;
        this.lastSeedMoney = lastSeedMoney;
        this.lastTotalAsset = lastTotalAsset;
        this.netIncome = netIncome;
        this.roi = roi;
        this.bankruptAt = bankruptAt;
    }
}
