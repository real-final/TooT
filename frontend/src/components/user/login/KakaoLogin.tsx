import { requestKakaoLogin } from "../../../utils/requestKakaoLogin";
import kakao_login_logo from "./../../../assets/images/kakao_login/ko/kakao_login_large_wide.png";

/** 카카오 로그인 버튼 UI */
const KakaoLogin: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 rounded-lg">
      <p className="text-white text-sm font-bold mb-2">
        TooT의 더 많은 기능을 사용하세요!
      </p>
      <button onClick={requestKakaoLogin}>
        <img src={kakao_login_logo} alt="kakao_login_img" width={240} />
      </button>
    </div>
  );
};

export default KakaoLogin;
