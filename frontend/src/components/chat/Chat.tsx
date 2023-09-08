import { useState } from "react";
import ChatList from "./ChatList";
import Guide from "./Guide";
import Input from "./input/Input";

const Chat = () => {
  const [bubbles, setBubbles] = useState<string[]>([]);
  const addBubble = (bubble:string) => {
    setBubbles(bubbles => [...bubbles, bubble]);
  };
  return (
  <div className="w-full h-full flex flex-col justify-between p-[10px] rounded-[24px] border-[8px] border-solid border-blue-950 bg-white">
    <ChatList bubbles={bubbles} />
    <Guide />
    <Input addBubble={addBubble} />
  </div>);
};

export default Chat;