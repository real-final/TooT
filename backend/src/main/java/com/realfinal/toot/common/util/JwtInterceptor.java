package com.realfinal.toot.common.util;


import com.realfinal.toot.api.user.service.UserService;
import com.realfinal.toot.common.exception.user.JwtInvalidException;
import com.realfinal.toot.common.exception.user.NoRefreshTokenInCookieException;
import com.realfinal.toot.common.exception.user.NotLoginedException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {

    private final UserService userService;
    private final JwtProviderUtil jwtProviderUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
            Object handler) throws Exception {
        try {
            String requestPath = request.getRequestURI();
            log.info("JwtInterceptor_preHandle_start: " + requestPath);

            if (requestPath.startsWith("/swagger-ui/") ||
                    requestPath.equals("/swagger-ui.html") ||
                    requestPath.startsWith("/v3/api-docs") ||
                    requestPath.startsWith("/webjars/") ||
                    requestPath.equals("/user/login/kakao")) {  // Kakao 로그인 경로 추가
                return true;
            }

            String refreshToken = null;

            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("refreshToken".equals(cookie.getName())) {
                        refreshToken = cookie.getValue();
                        break;
                    }
                }
            }

            if (refreshToken == null) { //로그인이 필요한 상황
                throw new NoRefreshTokenInCookieException();
            }
            //TODO ExpiredTime으로 남은 유효 기간 판단해서 만료되기 전 엑세스 토큰 재발급 (선택/자동) - 이게 금융권에서 사용하는 방법.
            log.info(
                    "=====================================     JWT Interceptor Start     =====================================");

            // error 페이지 요청 시 jwt 토큰 인터셉터 제외
            if ("/error".equals(requestPath)) {
                log.info("JwtInterceptor_preHandle_end: error page");
                log.info(
                        "=====================================     JWT Interceptor End     =====================================");
                return true;
            }

            // CORS - Method OPTIONS 는 허용처리해야함
            if (request.getMethod().equals("OPTIONS")) {
                return true;
            }

            String accessToken = request.getHeader("accessToken");
            // 로그아웃 상태가 아닌지 확인
            boolean isLogout = userService.isLogout(refreshToken);
            if (isLogout) {
                log.info("JwtInterceptor_preHandle_mid: isLogout: true");
                throw new NotLoginedException();
            } else {
                log.info("JwtInterceptor_preHandle_mid: isLogout: false");
            }

            // accessToken 이 유효한지 확인
            jwtProviderUtil.validateToken(accessToken);
            log.info("JwtInterceptor_preHandle_end: true");

        } catch (Exception e) {
            e.printStackTrace();
            log.info("JwtInterceptor_preHandle_end: JwtInvalidException");
            log.info(
                    "=====================================     JWT Interceptor End     =====================================");

            throw new JwtInvalidException();
        }
        return true;
    }
}
