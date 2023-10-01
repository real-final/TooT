import stockNameToId from "./stockNameToId";

/* 100: 주식 조회 */
export const code100 = (code:number, responseData:string[]) => {
  switch(code) {
    case 101:
      window.location.href = "/stock";
      break;
    case 102:
      const stockName:string = responseData[1];
      const stockId = stockNameToId[stockName];
      window.location.href = `/stock/${stockId}`;
      break;
  };
};