import { api } from "./api";

export const requestToken = async () => {
  try {
    let response = await api.get<{ token: string }>(`/${"토큰요청url"}`);
    if (response?.data?.token) {
      return response.data.token;
    }
  } catch {
    console.error("requestToken.ts, 서버 토큰요청 실패");
  }
};
