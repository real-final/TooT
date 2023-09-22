import { api } from "./api";

/** 서버로 사용자정보 요청 */
export const requestUserInfo = async (accessToken: string) => {
  try {
    let response = await api.get<object>("/user/userinfo", {
      headers: {
        accesstoken: accessToken,
      },
    });
    if (response?.data) {
      return response.data;
    }
  } catch {
    console.error("requestUserInfo.ts, 사용자정보 요청실패");
  }
  return undefined;
};
