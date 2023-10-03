import { api } from "../api";
import { pushBotBubble } from "./chat";

/* 700: 파산하기 */
export const code700 = async (code:number, dispatch:any, userAuthContext:any) => {
  const accessToken = userAuthContext?.accessToken;
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const userName = userInfo?.name;
  switch(code){
    case 701:
      if(!userName){
        pushBotBubble("로그인 후 파산 신청이 가능합니다.", dispatch);
        return;
      }
      const checkBankrupt = await api.get("bankruptcy/filing", {
        headers:{
          accesstoken: accessToken,
        }
      });
      if(checkBankrupt.data.data === false){
        pushBotBubble(`${userName}님은 현재 시드머니 대비 평가되는 총 자산이 70% 이상으로 아직 도전할 기회가 많으세요. 섣불리 파산을 신청하는 것보단, 현재 자산으로 희망을 갖고 열심히 투자하시면 좋겠어요!`, dispatch);
        return;
      }
      await pushBotBubble("파산 신청을 시도합니다...", dispatch);
      const fileBankrupt = await api.post("bankruptcy/proceed", {
        data: null,
      }, {
        headers: {
          accesstoken: accessToken,
        }
      });
      if(fileBankrupt.data.data === true){
        pushBotBubble("파산 신청 성공!", dispatch);
      } else {
        pushBotBubble("파산 신청 실패!", dispatch);
      }
      break;
  };
};