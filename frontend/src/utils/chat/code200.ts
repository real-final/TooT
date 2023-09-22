import { IResponseStockData } from "../../interface/IResponseStockData";

/* 200: 주식 거래 */
export const code200 = (stock:IResponseStockData) => {
  switch(stock.code){
    case 201:
      console.log(stock.name + " " + stock.share +"주 매수");
      break;
    case 202:
      break;
  };
};