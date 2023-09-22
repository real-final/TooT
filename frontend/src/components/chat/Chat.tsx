import { useEffect, useState } from "react";
import ChatList from "./ChatList";
import Guide from "./Guide";
import Input from "./input/Input";
import type { Ibubble } from "../../interface/Ibubble";

const Chat = () => {
  const [bubbles, setBubbles] = useState<Ibubble[]>([]);

  useEffect(() => {
    const storedChatList = localStorage.getItem('chat-list');
    if(storedChatList !== null && storedChatList !== undefined){
      setBubbles(JSON.parse(storedChatList));
    }
  }, []);

  const addBubble = (bubble:Ibubble) => {
    setBubbles(bubbles => [...bubbles, bubble]);
  };

  useEffect(() => {
    // TODO: 채팅 내역을 localstorage에 저장하고 있는데 저장 공간 초과를 방지하기 위해서 채팅 내역 리셋 로직 생각해보기
    localStorage.setItem('chat-list', JSON.stringify(bubbles));
  }, [bubbles]);

  return (
  <div className="w-full h-full flex flex-col justify-between p-2.5 rounded-3xl border-8 border-solid border-blue-950 bg-white">
    <ChatList bubbles={bubbles} />
    <Guide />
    <Input addBubble={addBubble} />
  </div>);
};

export default Chat;