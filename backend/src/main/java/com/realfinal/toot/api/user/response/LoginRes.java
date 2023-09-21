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

    private String accessToken;
    private String refreshToken;

    @Builder
    public LoginRes(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}