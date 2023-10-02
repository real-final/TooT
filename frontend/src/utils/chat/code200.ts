import stockNameToId from "./stockNameToId";
import { set } from "../../store/slices/stockSlice";

/* 200: 주식 거래 */
export const code200 = (code: number, responseData: string[], dispatch: any) => {
  const stockName = responseData[1];
  const stockId = stockNameToId[stockName];
  const share = parseInt(responseData[2]);
  let tradeType;
  switch(code){
    case 201:
      tradeType = "buy";
      break;
    case 202:
      tradeType = "sell"
      break;
  };
  dispatch(set({stockName, stockId, share, tradeType}));
  window.location.href = `/stock/${stockId}`;
};