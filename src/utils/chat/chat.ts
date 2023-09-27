import axios from "axios";
import { Ibubble } from "../../interface/Ibubble";
import { codeSwitch } from "./codeSwitch";

export const sendBubble = (text:string, addBubble: (bubble: Ibubble) => void) => {
  const newBubble: Ibubble = {
    message: text,
    speaker: true
  };
  addBubble(newBubble);
};

export const getBubble = async (text:string, addBubble: (bubble: Ibubble) => void) => {
  let responseData: Array<string> = [];
  let bubble = ""; 
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
      // TODO: 이미지가 오는 경우 고려(기존 버블 응답 객체와는 속성 이름이 달라서 추가로 수정 필요)

      // TODO: data 배열의 길이에 따라 추가로 파라미터들을 전달해야 함
      // ex) stockId, stockName, share 등
      const data = response.data.content[0].data.details.split('|');
      responseData = data.slice(0, -1);
      bubble = data.slice(-1);
      console.log(data);
      console.log(responseData);
      console.log(bubble);
      newBubble.message = bubble;
    }).catch((err) => console.log(err));
  await addBubble(newBubble);
  await codeSwitch(bubble, responseData);
};