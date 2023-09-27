/* 300: 랭킹 조회 */
export const code300 = (code:number) => {
  switch(code){
    case 301:
      window.location.href ="/ranking/total";
      break;
    case 302:
      window.location.href = "/ranking/friend";
  };
};