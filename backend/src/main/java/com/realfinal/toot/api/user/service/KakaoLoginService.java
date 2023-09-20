package com.realfinal.toot.api.user.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.realfinal.toot.api.user.mapper.UserMapper;
import com.realfinal.toot.api.user.request.KakaoUserInfoReq;
import com.realfinal.toot.api.user.request.UserReq;
import com.realfinal.toot.api.user.response.OauthTokenRes;
import com.realfinal.toot.common.exception.user.KakaoHTTPProtocolException;
import com.realfinal.toot.common.exception.user.KakaoIOException;
import com.realfinal.toot.common.exception.user.KakaoJSONEncodingException;
import com.realfinal.toot.common.exception.user.NotProvidedProviderException;
import com.realfinal.toot.db.entity.User;
import com.realfinal.toot.db.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.NameValuePair;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class KakaoLoginService {

    private final InMemoryClientRegistrationRepository inMemoryRepository;
    private final UserRepository userRepository;

    /**
     * 인가 코드와 api key 정보 등으로 카카오에 토큰 요청 메서드
     *
     * @param authorizeCode 프론트에서 받은 인가코드
     * @param providerName  이 경우 kakao
     * @return 토큰 정보들 (유효기간, access, refresh token 등 오어스 토큰 관련 정보들)
     */
    public OauthTokenRes getAccessToken(String authorizeCode, String providerName) {
        log.info("KakaoLoginService_getAccessToken_start: " + authorizeCode + " " + providerName);
        // 지정된 제공자(provider)의 클라이언트 등록 정보(예: 클라이언트 ID, 클라이언트 비밀번호, 리다이렉트 URI 등)를 가져옵니다.
        ClientRegistration provider = inMemoryRepository.findByRegistrationId(providerName);
// OAuth 토큰을 요청할 URL입니다.
        final String RequestUrl = "https://kauth.kakao.com/oauth/token";
// POST 요청에 전송될 파라미터 목록을 생성합니다.
        final List<NameValuePair> postParams = new ArrayList<NameValuePair>();
        postParams.add(new BasicNameValuePair("grant_type", "authorization_code")); // 인증 타입을 지정합니다.
        postParams.add(new BasicNameValuePair("client_id",
                provider.getClientId())); // 제공자의 정보에서 클라이언트 ID를 추가합니다.
        postParams.add(new BasicNameValuePair("client_secret",
                provider.getClientSecret())); // 제공자의 정보에서 클라이언트 비밀번호를 추가합니다.
        postParams.add(new BasicNameValuePair("redirect_uri",
                provider.getRedirectUri())); // 제공자의 정보에서 리다이렉트 URI를 추가합니다.
        postParams.add(new BasicNameValuePair("code", authorizeCode)); // 로그인 과정 중에 얻은 인증 코드를 추가합니다.

        // POST 요청을 보낼 HTTP 클라이언트를 생성합니다.
        final HttpClient client = HttpClientBuilder.create().build();
        final HttpPost post = new HttpPost(RequestUrl);
        OauthTokenRes tokenResponse = null;

        try {
            // POST 파라미터를 인코딩하고, HTTP POST 요청에 설정합니다.
            post.setEntity(new UrlEncodedFormEntity(postParams));
            // POST 요청을 실행하고 응답을 받습니다.
            final HttpResponse response = client.execute(post);
            final int responseCode = response.getStatusLine().getStatusCode();
            log.info("KakaoLoginService_getAccessToken_mid Sending 'POST' request to URL : "
                    + RequestUrl);
            log.info("KakaoLoginService_getAccessToken_mid Post parameters : " + postParams);
            log.info("KakaoLoginService_getAccessToken_mid Response Code : " + responseCode);

            // 응답을 OauthTokenResponse 객체로 바로 매핑
            ObjectMapper mapper = new ObjectMapper();
            tokenResponse = mapper.readValue(response.getEntity().getContent(),
                    OauthTokenRes.class);

        } catch (UnsupportedEncodingException e) {
            // 문자 인코딩이 지원되지 않을 때 발생하는 예외입니다. 예를 들면, UrlEncodedFormEntity에서 지원하지 않는 인코딩을 사용할 때 발생합니다.
            throw new KakaoJSONEncodingException();
        } catch (ClientProtocolException e) {
            // HTTP 프로토콜 오류가 발생했을 때의 예외입니다. 예를 들면, HTTP 규약을 따르지 않는 응답이 올 경우에 발생합니다.
            throw new KakaoHTTPProtocolException();
        } catch (IOException e) {
            // 입출력 오류가 발생했을 때의 예외. 예를 들면, 네트워크 연결 문제나 응답을 읽는 중에 오류가 발생할 경우에 발생합니다.
            throw new KakaoIOException();
        }
        log.info("KakaoLoginService_getAccessToken_end: " + tokenResponse.toString());
        return tokenResponse;
    }


    /**
     * 토큰이랑 api 키 등으로 카카오에서 사용자 정보 받아오기
     *
     * @param providerName  카카오
     * @param tokenResponse 토큰 정보들
     * @return 유저 entity
     */
    @Transactional
    public User getUserProfile(String providerName, OauthTokenRes tokenResponse) {
        log.info("KakaoLoginService_getUserProfile_start: " + providerName + " "
                + tokenResponse.toString());
        ClientRegistration provider = inMemoryRepository.findByRegistrationId(providerName);
        Map<String, Object> userAttributes = getUserAttributes(provider, tokenResponse);
        if (providerName.equals("kakao")) {
            KakaoUserInfoReq kakaoUserInfoReq = new KakaoUserInfoReq(userAttributes);
            UserReq userReq = UserMapper.INSTANCE.kakaoUserInfoReqToUserReq(kakaoUserInfoReq);
            User userEntity = userRepository.findByProviderId(userReq.getProviderId());
            if (userEntity == null) {
                userEntity = UserMapper.INSTANCE.userReqToUser(userReq);
                userRepository.save(userEntity);
            }
            log.info("KakaoLoginService_getUserProfile_end: " + userEntity.toString());
            return userEntity;
        }
        log.info(
                "KakaoLoginService_getUserProfile_mid: failed to access kakao, wrong provider name");
        throw new NotProvidedProviderException();
    }

    /**
     * OAuth 2.0 인증에 사용되는 클라이언트 정보(ClientRegistration 객체)와 액세스 토큰(OauthTokenRes 객체)을 사용하여 인증된 사용자의
     * 정보를 가져오기
     *
     * @param provider 카카오
     * @param tokenRes 인증에 필요한 정보들
     * @return 사용자 정보 json으로
     */
    private Map<String, Object> getUserAttributes(ClientRegistration provider,
            OauthTokenRes tokenRes) {
        log.info("KakaoLoginService_getUserAttributes_start: " + provider.toString() + " "
                + tokenRes.toString());
        // WebClient 인스턴스 생성 (WebFlux의 비동기 웹 클라이언트)
        Map<String, Object> userAttributes = WebClient.create()
                // HTTP GET 요청 설정
                .get()
                // 요청할 URI 설정 (OAuth2.0 제공자의 사용자 정보 엔드포인트 URI)
                .uri(provider.getProviderDetails().getUserInfoEndpoint().getUri())
                // 요청 헤더에 Bearer Authentication 토큰 설정
                .headers(header -> header.setBearerAuth(tokenRes.getAccessToken()))
                // 웹 요청 실행하고 응답을 반환
                .retrieve()
                // 응답 본문을 Map<String, Object> 형태로 변환
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                // 비동기 작업 완료를 기다리고 결과를 반환
                .block();
        log.info("KakaoLoginService_getUserAttributes_end: " + userAttributes.toString());
        return userAttributes;
    }
}
