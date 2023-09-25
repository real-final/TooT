import axios from "axios";

// 카카오 OAuth Redirect URI
// export const REDIRECT_URI = "http://localhost:3000";
export const REDIRECT_URI = "https://too-t.com";
  
// const REACT_APP_SERVER = "http://localhost:8080";
const REACT_APP_SERVER = "https://too-t.com/api";

const SIGNATURE = "WVVKWnlJRmFMSUFtalBPWlRqUFN2WXlPRUluSUtZVUc=";
const STAGE = "v1";
const DOMAIN_ID = "11717";

const CHATBOT_SERVER = `https://clovachatbot.ncloud.com/api/chatbot/messenger/${STAGE}/${DOMAIN_ID}/${SIGNATURE}`;

/** 서버로 ajax 요청 */
const api = axios.create({
  baseURL: REACT_APP_SERVER,
  withCredentials: true, // 쿠키와 인증 정보를 포함하여 요청
});

const chatbotApi = axios.create({
  baseURL: CHATBOT_SERVER,
});

export { api, chatbotApi};
