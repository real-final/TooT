import { IResponseStockData } from "../../interface/IResponseStockData";

/* 100: 주식 조회 */
export const code100 = (stock:IResponseStockData) => {
  switch(stock.code) {
    case 101:
      window.location.href = "/stock";
      break;
    case 102:
      window.location.href = `/stock/${stock.id}`;
      break;
  };
};