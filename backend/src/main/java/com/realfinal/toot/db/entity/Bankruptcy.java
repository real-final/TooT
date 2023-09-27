package com.realfinal.toot.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Table(name = "bankruptcy")
@Entity
public class Bankruptcy extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 파산 횟수
    @Column(name = "bankruptcy_no", nullable = false)
    private Integer bankruptyNo;

    // 마지막 보유현금
    @Column(name = "last_cash", nullable = false)
    private Long lastCash;

    // 마지막 시드머니
    @Column(name = "last_seed_money", nullable = false)
    private Long lastSeedMoney;

    // 최종 평가액
    @Column(name = "last_stock_value", nullable = false)
    private Long lastStockValue;

    // 최종 총자산
    @Column(name = "last_total_asset", nullable = false)
    private Long lastTotalAsset;

    // 순수익
    @Column(name = "net_income", nullable = false)
    private Long netIncome;

    // 손익률(수익률)
    @Column(name = "roi", nullable = false)
    private Double roi;

    // 파산 일시
    @Column(name = "bankrupt_at", nullable = false)
    private LocalDateTime bankruptAt;

    @Builder
    public Bankruptcy(User user, Integer bankruptyNo, Long lastCash, Long lastSeedMoney,
        Long lastStockValue, LocalDateTime current) {
        this.user = user;
        this.bankruptyNo = bankruptyNo;
        this.lastCash = lastCash;
        this.lastSeedMoney = lastSeedMoney;
        this.lastStockValue = lastStockValue;
        this.lastTotalAsset = lastStockValue + lastCash;
        this.roi = (double) this.lastTotalAsset / lastSeedMoney * 100;
        this.netIncome = this.lastTotalAsset - lastSeedMoney;
        this.bankruptAt = current;
    }
}
