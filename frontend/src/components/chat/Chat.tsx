import { useState } from "react";
import ChatList from "./ChatList";
import Guide from "./Guide";
import Input from "./input/Input";
import type { Ibubble } from "../../interface/Ibubble";

const Chat = () => {
  const [bubbles, setBubbles] = useState<Ibubble[]>([]);
  const addBubble = (bubble:Ibubble) => {
    setBubbles(bubbles => [...bubbles, bubble]);
  };
  return (
  <div className="w-full h-full flex flex-col justify-between p-2.5 rounded-3xl border-8 border-solid border-blue-950 bg-white">
    <ChatList bubbles={bubbles} />
    <Guide />
    <Input addBubble={addBubble} />
  </div>);
};

export default Chat;