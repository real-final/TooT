import { IResponseStockData } from "../../interface/IResponseStockData";

/* 400: 유저 정보 조회 */
export const code400 = (stock:IResponseStockData) => {
  const userProviderId = localStorage.getItem('user-provider-id');
  switch(stock.code){
    case 401:
      // TODO: localstorage의 userId 가져와서 넣기
      window.location.href = `/${userProviderId}/stock`;
      break;
    case 402:
      window.location.href = `/${userProviderId}/stock/${stock.name}`;
      break;
    case 403:
      window.location.href = `/${userProviderId}/bankrupt`;
      break;
    case 404:
      window.location.href = `/${userProviderId}/trade`;
      break;
  };
};