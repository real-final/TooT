import axios from "axios";

const REACT_APP_SERVER = "http://localhost:8080";

/** 서버로 ajax 요청 */
const api = axios.create({
  baseURL: REACT_APP_SERVER,
});

export default api;
