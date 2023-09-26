/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { useGetSearchParam } from "./hooks/useGetSearchParam";
import { sendKakaoAuthCode } from "./utils/sendKakaoAuthCode";
import { sendKakaoFriendsCode } from "./utils/sendKakaoFriendsCode";
import { UserAuthContext } from "./App";

/** URL 파라미터에 담기는 코드를 읽는 컴포넌트 */
const ParamsCodeReader: React.FC = () => {
  // 1. 카카오 인증코드 읽기
  const code = useGetSearchParam("code");

  // 2. 로그인 여부 파악
  const isSignedIn = !!window.localStorage.getItem("userInfo");

  // 3. access 토큰 가져오기
  const userAuthContext = useContext(UserAuthContext);
  const accessToken = userAuthContext?.accessToken as string;

  // 3. 로그인 상태에 따른 액션
  useEffect(() => {
    if (code?.length) {
      if (!isSignedIn) {
        // 로그인 안했으면? 카카오 OAuth 코드
        sendKakaoAuthCode(code);
      } else {
        // 로그인 했으면? 카카오 친구목록 코드
        sendKakaoFriendsCode(code, accessToken);
      }
    }
  }, []);

  return <></>;
};

export default ParamsCodeReader;
