package com.realfinal.toot.api.user.mapper;

import com.realfinal.toot.api.user.request.KakaoUserInfoReq;
import com.realfinal.toot.api.user.request.UserReq;
import com.realfinal.toot.api.user.response.LoginRes;
import com.realfinal.toot.api.user.response.OauthTokenRes;
import com.realfinal.toot.api.user.response.UserRes;
import com.realfinal.toot.common.exception.user.MapperException;
import com.realfinal.toot.db.entity.User;
import org.apache.http.HttpResponse;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;
import org.mapstruct.Mapper;

@Component
@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User userReqToUser(UserReq userReq) throws MapperException;

    LoginRes userToLoginRes(String accessToken, String refreshToken)
            throws MapperException;

    default UserReq kakaoUserInfoReqToUserReq(KakaoUserInfoReq kakaoUserInfoReq)
            throws MapperException {
        return UserReq.builder()
                .providerId(String.valueOf(kakaoUserInfoReq.getProviderId()))
                .name(kakaoUserInfoReq.getNickName())
                .profileImage(kakaoUserInfoReq.getImageUrl())
                .build();
    }

    UserRes userToUserRes(User user) throws MapperException;

}
