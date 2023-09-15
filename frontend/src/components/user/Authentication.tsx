/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utils/api";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

/** Kakao 로그인 후 params에 담긴 code를 서버로 보내주기 */
const Authentication: React.FC = () => {
  const query = useQuery();
  const code = query.get("code"); // 인증 Code 저장

  const fetchData = async () => {
    try {
      await api.get(`/user/login/kakao?code=${code}`);
      console.log("서버 전송성공");
      window.location.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  // 코드가 있으면 서버로 인증 Code 전송
  useEffect(() => {
    code && fetchData();
  }, [code]);

  return <></>;
};

export default Authentication;
