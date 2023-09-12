import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "./../../util/api";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Authentication = () => {
  const query = useQuery();
  const code = query.get("code"); // 인증 Code 저장

  const fetchData = async () => {
    try {
      await api.get(`/auth/kakao/callback?code=${code}`);
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
