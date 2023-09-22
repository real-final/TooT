import axios from "axios";

// const REACT_APP_SERVER = "http://localhost:8080";
// const REACT_APP_SERVER = "http://70.12.247.88:8080";
const REACT_APP_SERVER = "https://too-t.com/api";

const SIGNATURE = "WVVKWnlJRmFMSUFtalBPWlRqUFN2WXlPRUluSUtZVUc=";
const STAGE = "v1";
const DOMAIN_ID = "11717";

const CHATBOT_SERVER = `https://clovachatbot.ncloud.com/api/chatbot/messenger/${STAGE}/${DOMAIN_ID}/${SIGNATURE}`;

/** 서버로 ajax 요청 */
const api = axios.create({
  baseURL: REACT_APP_SERVER,
});

const chatbotApi = axios.create({
  baseURL: CHATBOT_SERVER,
});

export { api, chatbotApi};
