import axios from "axios";

const REACT_APP_SERVER = "http://localhost:8080";
const CHATBOT_SERVER = "https://8kpzmcie3f.apigw.ntruss.com/custom/v1/11717/4341b324382837bdd4e3484b0ba438beb6f358968d0a6d09cfcacd9396c11ce6";

/** 서버로 ajax 요청 */
const api = axios.create({
  baseURL: REACT_APP_SERVER,
});

const chatbotApi = axios.create({
  baseURL: CHATBOT_SERVER,
});

export default api;
