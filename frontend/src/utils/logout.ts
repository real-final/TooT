import { api } from "./api";

export const logout = async () => {
  await api.get("/user/logout");
  window.location.replace("/");
};
