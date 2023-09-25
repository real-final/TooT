package com.realfinal.toot.api.user.controller;

import com.realfinal.toot.api.user.response.UserRes;
import com.realfinal.toot.api.user.service.UserService;
import com.realfinal.toot.common.model.CommonResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;
    private final String SUCCESS = "success";

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
        log.info("UserController_kakaoLogin_start: ====================================================================");
        log.info("UserController_kakaoLogin_start: " + code + " //////// " + response.toString());
        String refreshToken = userService.login(code, "kakao");
        log.info("UserController_kakaoLogin_mid: " + refreshToken);

        // "refreshToken"을 쿠키에 설정
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        response.setHeader("Set-Cookie", refreshTokenCookie + "; SameSite=None");

        log.info("============================" + refreshTokenCookie + "=====================================");
        log.info("UserController_kakaoLogin_end: " + refreshToken);
        return CommonResponse.success(SUCCESS);
    }

    /**
     * refresh token (JWT)로 access token 재발급
     *
     * @param request (쿠키에 담긴 토큰 추출해서 확인)
     * @return 새 access token
     */
    @GetMapping("/refresh")
    public CommonResponse<String> recreateAccessToken(HttpServletRequest request, HttpServletResponse response) {
        log.info("UserController_recreateAccessToken_start");
        String refreshToken = getTokenFromCookie(request);
        log.info("UserController_recreateAccessToken_mid: " + refreshToken);
        String newAccessToken = userService.recreateAccessToken(refreshToken);
        log.info("UserController_recreateAccessToken_end: " + newAccessToken);
        response.addHeader("accesstoken", newAccessToken);

        return CommonResponse.success(SUCCESS);
    }


    /**
     * access token으로 사용자 정보 조회
     *
     * @param accessToken jwt 토큰
     * @return 사용자 정보
     */
    @GetMapping("/userinfo")
    public CommonResponse<UserRes> getUserInfo(
            @RequestHeader(value = "accesstoken", required = false) String accessToken) {
        log.info("UserController_getUserInfo_start: " + accessToken);
        UserRes userRes = userService.getUserInfo(accessToken);
        log.info("UserController_getUserInfo_end: " + userRes.toString());
        return CommonResponse.success(userRes);
    }

    /**
     * 로그아웃. JWT 토큰 정보 삭제
     *
     * @param request (쿠키에 담긴 토큰 추출해서 확인)
     * @return "success"
     */
    @GetMapping("/logout")
    public CommonResponse<String> logout(HttpServletRequest request, HttpServletResponse response) {
        log.info("UserController_logout_start");
        String refreshToken = getTokenFromCookie(request);
        log.info("UserController_logout_mid: " + refreshToken);
        userService.logout(refreshToken);

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setMaxAge(0); // 쿠키 삭제
                cookie.setPath("/"); // 이 경로에 설정된 쿠키를 삭제
                response.addCookie(cookie); // 응답에 쿠키를 다시 추가
            }
        }

        log.info("UserController_logout_end: success");
        return CommonResponse.success(SUCCESS);
    }

    /**
     * request에서 쿠키에서 refreshtoken 추출
     *
     * @param request 쿠키 정보 위해.
     * @return refresh token
     */
    private String getTokenFromCookie(HttpServletRequest request) {
        String refreshToken = null;

        log.info("UserController_getTokenFromCookie_start: " + request.toString());
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }
        log.info("UserController_getTokenFromCookie_end: " + refreshToken);
        return refreshToken;
    }
}

