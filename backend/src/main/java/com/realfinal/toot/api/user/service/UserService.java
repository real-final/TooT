package com.realfinal.toot.api.user.service;

import com.realfinal.toot.api.user.response.LoginRes;
import com.realfinal.toot.api.user.response.UserRes;

public interface UserService {

    LoginRes login(String code, String provider);

    void logout(String accessToken, String refreshToken);

    UserRes getUserInfo(String accessToken);

    String recreateAccessToken(String accessToken, String refreshToken);

    void saveTokens(String id, String refreshJWTToken, String accessToken);


}
