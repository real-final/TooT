import { code100 } from "./code100";
import { code200 } from "./code200";
import { code300 } from "./code300";
import { code400 } from "./code400";
import { code600 } from "./code600";
import { code900 } from "./code900";

export const codeSwitch = (bubble:string, responseData:string[], userMessage:string, dispatch:any, navigate: any) => {
  const code = parseInt(responseData[0]);

  switch (true) {
    case 100 <= code && code < 200 :
      code100(code, responseData);
      break;
    case 200 <= code && code < 300:
      code200(code, responseData, dispatch, navigate);
      break;
    case 300 <= code && code < 400 :
      code300(code);
      break;
    case 400 <= code && code < 500:
      code400(code, responseData);
      break;
    case 600 <= code && code < 700 :
      code600(code);
      break;
    // TODO: 파산하기 넣기
    case 700 <= code && code < 800 :
      break;
    case 800 <= code && code < 900 :
    // TODO: 이스터에그 추가 처리 필요하면 넣기
      break;
    case 900 <= code && code < 1000:
      code900(code, userMessage, dispatch);
      break;
  };
};