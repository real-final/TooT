import stockNameToId from "./stockNameToId";
import { set } from "../../store/slices/stockSlice";
import { setRespondingFalse } from "../../store/slices/chatInputSlice";

/* 200: 주식 거래 */
export const code200 = async (code: number, responseData: string[], dispatch: any, navigate: any) => {
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
  await dispatch(set({stockName, stockId, share, tradeType}));
  await dispatch(setRespondingFalse());
  navigate(`/stock/${stockId}`);
};