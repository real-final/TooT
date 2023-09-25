import { api } from "./api";

export const sendKakaoAuthCode = async (code: string) => {
  try {
    await api.get(`/user/login/kakao?code=${code}`);
    // window.location.replace("/"); // 브라우저 URL 안의 parameter를 지우기 위한 새로고침
  } catch (error) {
    console.error("위치: Authentication.tsx, 카카오인증코드 서버전송 실패");
  }
};
