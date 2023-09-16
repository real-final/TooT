import { useSearchParams } from "react-router-dom";

export const useGetSearchParam = (key: string) => {
  const [searchParam] = useSearchParams();
  const value = searchParam.get(key); // 인증 Code 저장

  return value;
};
