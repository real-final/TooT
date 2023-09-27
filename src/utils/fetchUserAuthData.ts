import { requestAccessToken } from "./requestAccessToken";
import { requestUserInfo } from "./requestUserInfo";

/** 유저정보 & Access토큰 요청 함수 */
export const fetchUserAuthData = async () => {
  // 1. Access토큰 요청
  const accessToken = await requestAccessToken();
  await console.log(accessToken);

  // 2. 사용자정보 요청
  if (typeof accessToken === "string") {
    const userInfo = await requestUserInfo(accessToken);

    // 3. Access토큰 & 사용자정보 저장
    if (userInfo && Object.keys(userInfo).length > 0) {
      // LocalStorage에 userInfo 저장
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      return {
        accessToken: accessToken,
        userInfo: userInfo,
      };
    } else {
      throw new Error("위치: fetchUserAuthData.tsx, 사용자정보 요청 실패");
    }
  } else {
    throw new Error("위치: fetchUserAuthData.tsx, Access토큰 요청 실패");
  }
};
