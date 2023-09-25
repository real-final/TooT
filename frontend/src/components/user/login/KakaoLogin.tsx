import { useEffect } from "react";
import { useMutation } from "react-query";
import { useGetSearchParam } from "../../../hooks/useGetSearchParam";
import { requestKakaoLogin } from "../../../utils/requestKakaoLogin";
import { sendKakaoAuthCode } from "../../../utils/sendKakaoAuthCode";

import kakao_login_logo from "./../../../assets/images/kakao_login/ko/kakao_login_large_wide.png";
import { CircularProgress } from "@mui/joy";

const KakaoLogin: React.FC = () => {
  // 1. 카카오 인증코드 읽기
  const code = useGetSearchParam("code");
  // 2. 카카오 인증코드로 서버에 Refresh토큰 요청
  const mutation = useMutation(() => {
    if (typeof code === "string") {
      return sendKakaoAuthCode(code);
    }
    throw new Error("위치: KakaoLogin.tsx, Code is not available");
  });

  // Warning: 무한루프 조심
  useEffect(() => {
    if (code && !mutation.isError && !mutation.isLoading) {
      mutation.mutate();
    }
    // eslint-disable-next-line
  }, []);

  return mutation.isLoading ? (
    <LoginWaitScreen />
  ) : (
    <KaKaoLoginButton onClick={requestKakaoLogin} />
  );
};

export default KakaoLogin;

/** 카카오 로그인 버튼 UI */
const KaKaoLoginButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 rounded-lg">
      <p className="text-white text-sm font-bold mb-2">
        TooT의 더 많은 기능을 사용하세요!
      </p>
      <button onClick={onClick}>
        <img src={kakao_login_logo} alt="kakao_login_img" width={240} />
      </button>
    </div>
  );
};

/** 로그인 로딩중 UI */
const LoginWaitScreen: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 rounded-lg">
      <CircularProgress />
    </div>
  );
};
