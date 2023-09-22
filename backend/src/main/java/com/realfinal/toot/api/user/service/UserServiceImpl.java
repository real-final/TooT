package com.realfinal.toot.api.user.service;


import com.realfinal.toot.api.user.mapper.UserMapper;
import com.realfinal.toot.api.user.response.OauthTokenRes;
import com.realfinal.toot.api.user.response.UserRes;
import com.realfinal.toot.common.exception.user.InvalidTokenException;
import com.realfinal.toot.common.exception.user.KakaoTokenRequestException;
import com.realfinal.toot.common.exception.user.MySQLSearchException;
import com.realfinal.toot.common.exception.user.NotProvidedProviderException;
import com.realfinal.toot.common.util.JwtProviderUtil;
import com.realfinal.toot.common.util.RedisUtil;
import com.realfinal.toot.db.entity.User;
import com.realfinal.toot.db.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class UserServiceImpl implements UserService {

    private final JwtProviderUtil jwtProviderUtil;
    private final RedisUtil redisUtil;
    private final UserRepository userRepository;
    private final KakaoLoginService kakaoLoginService;

    /**
     * 로그인 메서드. provider로 분기.
     *
     * @param code     인가코드
     * @param provider 카카오
     * @return refresh token
     */
    @Override
    public String login(String code, String provider) {
        log.info("UserServiceImpl_login_start: " + code + " " + provider);
        if (provider.equals("kakao")) {
            OauthTokenRes jsonToken = kakaoLoginService.getAccessToken(code, "kakao");
            if (jsonToken.getError() != null) {
                log.info("UserServiceImpl_login_mid: kakao 데이터 요청, 에러 반환, 에러코드: "
                        + jsonToken.getErrorCode() + " " + jsonToken.getErrorDescription());
                throw new KakaoTokenRequestException();
            }
            String id = kakaoLoginService.getUserProfile("kakao", jsonToken);
            try {
                String refreshToken = jwtProviderUtil.createRefreshToken();
                saveTokens(id, refreshToken,
                        jsonToken.getAccessToken());
                return refreshToken;
            } catch (Exception e) {
                log.info("UserServiceImpl_login_mid: failed to login");
            }

        }
        throw new NotProvidedProviderException();
    }

    /**
     * 로그아웃. 토큰 삭제
     *
     * @param refreshToken refreshToken
     */
    @Transactional
    public void logout(String refreshToken) {
        log.info("UserServiceImpl_logout_start: " + " " + refreshToken);
        redisUtil.deleteData(refreshToken);
        log.info("UserServiceImpl_logout_end: redis key deleted");
    }

    /**
     * 유저 정보 조회. access token으로 확인. 유효하지 않으면 에러.
     *
     * @param accessToken accessToken
     * @return 유저 정보
     */
    @Override
    public UserRes getUserInfo(String accessToken) {
        log.info("UserServiceImpl_getUserInfo_start: " + accessToken);
        Long id = jwtProviderUtil.getPayload(accessToken);
        if (jwtProviderUtil.validateToken(accessToken)) {
            User user = userRepository.findById(id).orElseThrow(MySQLSearchException::new);
            UserRes userRes = UserMapper.INSTANCE.userToUserRes(user);
            log.info("UserServiceImpl_getUserInfo_end: " + userRes.toString());
            return userRes;
        }
        throw new InvalidTokenException();
    }

    /**
     * refresh token으로 access token 재발급
     *
     * @param refreshToken refreshToken
     * @return 새 accesstoken
     */
    @Override
    public String recreateAccessToken(String refreshToken) {
        log.info("UserServiceImpl_recreateAccessToken_start: " + refreshToken);
        String newAccessToken = jwtProviderUtil.recreateAccessToken(refreshToken);
        log.info("UserServiceImpl_recreateAccessToken_end: " + newAccessToken);
        return newAccessToken;
    }

    /**
     * 생성된 토큰 레디스에 저장
     *
     * @param id              토큰 user
     * @param refreshJWTToken JWT refresh token
     * @param accessToken     oauth access token
     */
    @Override
    public void saveTokens(String id, String refreshJWTToken, String accessToken) {
        log.info("UserServiceImpl_saveTokens_start: " + id + " " + refreshJWTToken + " "
                + accessToken);
        redisUtil.setDataExpire(refreshJWTToken, id, 1209600000);
        redisUtil.setDataExpire(accessToken, id, 31536000);
        log.info("UserServiceImpl_saveTokens_end: token saved");
    }

    /**
     * 인터셉터에서 로그인 된 사용자인지 확인. 쿠키에 있는 refresh token과 redis에 있는  refresh token이 같은건지 확인
     *
     * @param refreshToken 리프레시 토큰
     * @return 결과가 로그아웃이다 판단하면 true, 로그인 된 상태면 false
     */
    @Override
    public boolean isLogout(String refreshToken) {
        log.info("UserServiceImpl_isLogout_start: " + refreshToken);
        String data = redisUtil.getData(refreshToken);
        log.info("UserServiceImpl_isLogout_end: isLogout?" + (data == null));
        return data == null;
    }

}
