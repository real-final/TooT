package com.realfinal.toot.config;

import com.realfinal.toot.common.util.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final JwtInterceptor jwtInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(jwtInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(
                        "/user/auth/**",
                        "/board/auth/**",
                        "/notification/auth/**",
                        "/swagger-ui/**",           // 이 부분을 추가
                        "/webjars/**",
                        "/swagger-resources/**",
                        "/v2/api-docs",
                        "/v3/api-docs"
                );
    }
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry
            .addMapping("/user/**")  // 허용할 URL 패턴 설정
            .allowedOrigins("http://localhost:3000", "https://too-t.com")  // 허용할 오리진(도메인) 설정
            .allowedMethods("GET", "POST", "PUT", "PATCH", "OPTION")  // 허용할 HTTP 메소드 설정
            .allowedHeaders("*");  // 허용할 헤더 설정
    }

}

