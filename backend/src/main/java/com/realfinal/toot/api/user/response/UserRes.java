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

    private String providerId;
    private Long seedMoney;
    private Long cash;
    private String profileImage;
    private String name;
    private Integer bankruptcyNo;
    private LocalDate lastQuizDate;
    private LocalDateTime joinAt;

    @Builder
    public UserRes(String providerId, Long seedMoney, Long cash, String profileImage, String name,
            Integer bankruptcyNo, LocalDate lastQuizDate,
            LocalDateTime joinAt) {
        this.providerId = providerId;
        this.seedMoney = seedMoney;
        this.cash = cash;
        this.profileImage = profileImage;
        this.name = name;
        this.bankruptcyNo = bankruptcyNo;
        this.lastQuizDate = lastQuizDate;
        this.joinAt = joinAt;
    }
}
