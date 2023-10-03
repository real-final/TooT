import axios from "axios";
import { Ibubble } from "../../interface/Ibubble";
import { add } from "../../store/slices/bubbleSlice";
import { codeSwitch } from "./codeSwitch";

export const pushBotBubble = (message:string, dispatch: any) => {
  const newBubble: Ibubble = {
    message: message,
    speaker: false,
  };
  dispatch(add(newBubble));
};

export const sendBubble = (text:string, dispatch: any) => {
  const newBubble: Ibubble = {
    message: text,
    speaker: true
  };
  dispatch(add(newBubble));
};

export const getBubble = async (text:string, dispatch: any, navigate: any, userAuthContext:any) => {

  let bubble = "";
  let bubbleData:any = [];
  
  // TODO: userID와 timestamp 값 동적으로 바꾸기
  const sendData = {
    userId: "1234",
    timestamp: 20230919,
    content: [{ type: "text", data: { details: text } }],
    event: "send",
  };

  const newBubble: Ibubble = {
    type: "",
    url: undefined,
    message: "",
    speaker: false
  };

  // TODO: 배포 url로 바꾸기
  await axios.post("https://too-t.com/express/chatbot", {sendData}).then((res) => {
    console.log(res);
    const data = res.data.chatResponse;
    const bubbleType = data.content[0].type;
    newBubble.type = bubbleType;
    if(bubbleType === "text"){
      const bubbleSlices = data.content[0].data.details.split('|');
      bubbleData = bubbleSlices.slice(0, -1);
      bubble = bubbleSlices.slice(-1);
      newBubble.message = bubble;
    }
    else if(bubbleType === "image"){
      const bubbleSlices = data.content[0].data.description.split('|');
      newBubble.url = data.content[0].data.url;
      bubble = bubbleSlices.slice(-1);
      newBubble.message = bubble;
    }
  });
  await dispatch(add(newBubble));
  await codeSwitch(bubbleData, text, dispatch, navigate, userAuthContext);
};
