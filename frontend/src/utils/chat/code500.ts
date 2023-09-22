/* 500: 데일리 퀴즈 */
export const code500 = (code:number) => {
  switch(code){
    case 501:
      window.location.href = "/quiz";
      break;
    case 502:
      // TODO: Quiz 정답 처리
      break;
    case 503:
      // TODO: Quiz 오답 처리
      break;
  };
};