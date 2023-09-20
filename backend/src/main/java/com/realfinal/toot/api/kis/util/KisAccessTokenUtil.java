package com.realfinal.toot.api.kis.util;

import static com.realfinal.toot.common.exception.ErrorCode.KIS_TOKEN_REQUEST_FAILED;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.realfinal.toot.api.kis.request.KisTokenCreateReq;
import com.realfinal.toot.api.kis.response.KisTokenCreateRes;
import com.realfinal.toot.common.exception.kis.KisTokenRequestException;
import com.realfinal.toot.config.KisConfig;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException.Forbidden;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class KisAccessTokenUtil {

  public static String accessToken;
  private final String kisUri = "https://openapi.koreainvestment.com:9443";
  private final WebClient kisWebClient =
      WebClient
          .builder()
          .baseUrl(kisUri)
          .build();
  private final KisTokenCreateReq kisTokenCreateReq;

  @Autowired
  public KisAccessTokenUtil(KisConfig kisConfig) {
    this.kisTokenCreateReq = new KisTokenCreateReq(kisConfig);
  }

  @PostConstruct // 의존성 주입이 이루어진 후 초기화를 수행하는 메서드
  @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul") // 매일 자정 토큰 발급
  public void getAccessToken() {

    KisTokenCreateRes kisTokenCreateRes = null;

    // 한투에서 accesstoken 얻어오는 연결
    String tokenResponse = kisWebClient
          .post()
          .uri("/oauth2/tokenP")
          .contentType(MediaType.APPLICATION_JSON)
          .bodyValue(kisTokenCreateReq)
          .retrieve()
          .bodyToMono(String.class)
          .block();

    try{
      // JSON 결과를 토큰 response dto로 변환
      ObjectMapper mapper = new ObjectMapper();
      kisTokenCreateRes = mapper.readValue(tokenResponse, KisTokenCreateRes.class);

      accessToken = kisTokenCreateRes.getAccessToken();
    } catch (JsonProcessingException e) {
      // 요청값이 제대로 가지 않아 한투에서 거부하는 경우
      throw new KisTokenRequestException();
    }

  }
}
