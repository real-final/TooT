package com.realfinal.toot.api.user.controller;

import com.realfinal.toot.api.user.response.LoginRes;
import com.realfinal.toot.api.user.response.UserRes;
import com.realfinal.toot.api.user.service.UserService;
import com.realfinal.toot.common.model.CommonResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    /**
     * 카카오 로그인
     *
     * @param code     카카오 오어스 인가코드
     * @param response 쿠키 담을거
     * @return 사용자정보 + accesstoken
     */
    @GetMapping("/login/kakao")
    public CommonResponse<?> kakaoLogin(@RequestParam String code,
            HttpServletResponse response) {
        log.info("UserController_kakaoLogin_start: " + code + " " + response.toString());
        LoginRes loginRes = userService.login(code, "kakao");
        Cookie refreshTokenCookie = new Cookie("refreshToken", loginRes.getRefreshToken());
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        response.addCookie(refreshTokenCookie);
        log.info("UserController_kakaoLogin_end: " + loginRes.toString());
        return CommonResponse.success(loginRes);
    }

    /**
     * refresh token (JWT)로 access token 재발급
     *
     * @param accessToken  (만료됨. id 추출용)
     * @param refreshToken (쿠키에 담긴 토큰)
     * @return 새 access token
     */
    @GetMapping("/refresh")
    public CommonResponse<String> recreateAccessToken(@RequestBody String accessToken,
            @RequestHeader("refreshToken") String refreshToken) {
        log.info("UserController_recreateAccessToken_start: " + accessToken + " " + refreshToken);
        String newAccessToken = userService.recreateAccessToken(accessToken, refreshToken);
        log.info("UserController_recreateAccessToken_end: " + newAccessToken);
        return CommonResponse.success(newAccessToken);
    }

    /**
     * access token으로 사용자 정보 조회
     *
     * @param accessToken
     * @return 사용자 정보
     */
    @GetMapping("/userinfo")
    public CommonResponse<UserRes> getUserInfo(@RequestBody String accessToken) {
        log.info("UserController_getUserInfo_start: " + accessToken);
        UserRes userRes = userService.getUserInfo(accessToken);
        log.info("UserController_getUserInfo_end: " + userRes.toString());
        return CommonResponse.success(userRes);
    }

    /**
     * 로그아웃. JWT 토큰 정보 삭제
     *
     * @param accessToken
     * @param refreshToken
     * @return "success"
     */
    @GetMapping("/logout")
    public CommonResponse<String> logout(@RequestBody String accessToken,
            @RequestHeader("refreshToken") String refreshToken) {
        log.info("UserController_logout_start: " + accessToken + " " + refreshToken);
        userService.logout(accessToken, refreshToken);
        log.info("UserController_logout_end: success");
        return CommonResponse.success("success");
    }
}