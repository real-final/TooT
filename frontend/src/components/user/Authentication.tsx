/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useGetSearchParam } from "../../hooks/useGetSearchParam";
import { api } from "../../utils/api";

/** Kakao 로그인 후 params에 담긴 code를 서버로 보내주기 */
const Authentication: React.FC = () => {
  const code = useGetSearchParam("code");

  const fetchData = async () => {
    try {
      await api.get(`/user/login/kakao?code=${code}`);
      window.location.replace("/"); // 브라우저 URL 안의 parameter를 지우기 위한 새로고침
    } catch (error) {
      console.error("위치: Authentication.tsx, 카카오인증코드 서버전송 실패");
    }
  };

  // 코드가 있으면 서버로 인증 Code 전송
  useEffect(() => {
    code && fetchData();
  }, [code]);

  return <></>;
};

export default Authentication;
