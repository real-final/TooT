import kakao_login_logo from "./../../assets/images/kakao_login/ko/kakao_login_large_wide.png";

const KakaoLogin = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 rounded-lg">
      <p className="text-white text-sm font-bold mb-2">
        TooT의 더 많은 기능을 사용하세요!
      </p>
      <a href="/auth/kako">
        <img src={kakao_login_logo} alt="kakao_login_img" width={240} />
      </a>
    </div>
  );
};

export default KakaoLogin;
