package com.realfinal.toot.api.user.response;

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
    private String email;
    private Integer bankruptcyNo;
    private Integer resignNo;
    private String lastQuizDate;
    private String joinAt;
    private String deleteAt;

    @Builder
    public UserRes(String providerId, Long seedMoney, Long cash, String profileImage, String name,
            String email, Integer bankruptcyNo, Integer resignNo, String lastQuizDate,
            String joinAt,
            String deleteAt) {
        this.providerId = providerId;
        this.seedMoney = seedMoney;
        this.cash = cash;
        this.profileImage = profileImage;
        this.name = name;
        this.email = email;
        this.bankruptcyNo = bankruptcyNo;
        this.resignNo = resignNo;
        this.lastQuizDate = lastQuizDate;
        this.joinAt = joinAt;
        this.deleteAt = deleteAt;
    }
}
