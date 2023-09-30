package com.realfinal.toot.api.user.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class UserRes {

    private Long id;
    private Long seedMoney;
    private Long cash;
    private String profileImage;
    private String name;
    private Integer bankruptcyNo;
    private LocalDate lastQuizDate;
    private LocalDateTime joinAt;
    private Long totalValue;

    @Builder
    public UserRes(Long id, Long seedMoney, Long cash, String profileImage, String name,
        Integer bankruptcyNo, LocalDate lastQuizDate, LocalDateTime joinAt, Long totalValue) {
        this.id = id;
        this.seedMoney = seedMoney;
        this.cash = cash;
        this.profileImage = profileImage;
        this.name = name;
        this.bankruptcyNo = bankruptcyNo;
        this.lastQuizDate = lastQuizDate;
        this.joinAt = joinAt;
        this.totalValue = totalValue;
    }
}
