import { IResponseStockData } from "../../interface/IResponseStockData";

/* 400: 유저 정보 조회 */
export const code400 = (stock:IResponseStockData) => {
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const userId = userInfo ? userInfo.id : null;
  if(userId === null) {
    window.location.href = "/error";
  }
  switch(stock.code){
    case 401:
      // TODO: localstorage의 userId 가져와서 넣기
      window.location.href = `/${userId}/stock`;
      break;
    case 402:
      window.location.href = `/${userId}/stock/${stock.name}`;
      break;
    case 403:
      window.location.href = `/${userId}/bankrupt`;
      break;
    case 404:
      window.location.href = `/${userId}/trade`;
      break;
  };
};
