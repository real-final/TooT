import axios from "axios";
import { Ibubble } from "../interface/Ibubble";

export const sendBubble = (text:string, addBubble: (bubble: Ibubble) => void) => {
  const newBubble: Ibubble = {
    message: text,
    speaker: true
  };
  addBubble(newBubble);
};

export const getBubble = async (text:string, addBubble: (bubble: Ibubble) => void) => {
  
  // TODO: userID와 timestamp 값 동적으로 바꾸기
  const sendData = {
    userId: "1234",
    timestamp: 20230919,
    content: [{ type: "text", data: { details: text } }],
    event: "send",
  };

  const newBubble: Ibubble = {
    message: "",
    speaker: false
  };

  // TODO: axios => react query + axios로 바꾸기
  await axios.post("https://clovachatbot.ncloud.com/api/chatbot/messenger/v1/11717/4341b324382837bdd4e3484b0ba438beb6f358968d0a6d09cfcacd9396c11ce6/message", sendData).then(
    (response) => { 
      console.log(response);
      const data = response.data.content[0].data.details.split('|');
      // TODO: sessionStorage 대신 다른 공간에 저장 & code switch 함수로 전달하기
      sessionStorage.setItem('chat-code', JSON.stringify(data[0]));
      newBubble.message = data[1];
    }).catch((err) => console.log(err));

  addBubble(newBubble);
};