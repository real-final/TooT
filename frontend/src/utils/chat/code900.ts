import axios from "axios";
import { pushBotBubble } from "./chat";

/* 900: chatGPT 패스 & 에러 */
export const code900 = async (code:number, userMessage: string, dispatch: any) => {
  switch(code){
    case 901:
      pushBotBubble("잠시만 기다려주세요...", dispatch);
      // TODO: chatGPT에게 bubble 전달
      await axios.post("https://too-t.com/express/chatgpt", {
        sendData: userMessage,
      }).then((res) => {
        console.log(res);
        pushBotBubble(res.data.chatResponse.choices[0].message.content, dispatch);
      }).catch((err) => {
        console.log(err);
      });
      break;
    case 999:
      break;
  };
};