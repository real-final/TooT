package com.realfinal.toot.api.user.response;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@ToString
@NoArgsConstructor
public class LoginRes {

    private Long id;
    private String name;
    private String imageUrl;
    private Long seedMoney;
    private Long cash;
    private Integer bankruptcyNo;
    private LocalDateTime lastQuizDate;
    private String accessToken;
    @JsonIgnore
    private String refreshToken;

    @Builder
    public LoginRes(Long id, String name, String imageUrl, Long seedMoney, Long cash,
            Integer bankruptcyNo, LocalDateTime lastQuizDate, String accessToken,
            String refreshToken) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.seedMoney = seedMoney;
        this.cash = cash;
        this.bankruptcyNo = bankruptcyNo;
        this.lastQuizDate = lastQuizDate;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}