import kakao_login_logo from "./../../assets/images/kakao_login/ko/kakao_login_large_wide.png";

interface KaKaoButtonProps {
  onClick: () => void;
}

/** 카카오 로그인 버튼 UI */
const KaKaoButton: React.FC<KaKaoButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={kakao_login_logo} alt="kakao_login_img" width={240} />
    </button>
  );
};

/** 버튼 클릭 후 카카오 로그인 화면 이동 */
const handleLoginClick = () => {
  const REST_API_KEY = "d1fc52f81b5a4dd2f6ae29b5fb7d6932";
  const REDIRECT_URI = "http://localhost:3000";
  const authUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  window.location.href = authUrl;
};

const KakaoLogin: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 rounded-lg">
      <p className="text-white text-sm font-bold mb-2">
        TooT의 더 많은 기능을 사용하세요!
      </p>
      <KaKaoButton onClick={handleLoginClick} />
    </div>
  );
};

export default KakaoLogin;
