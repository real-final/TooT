import { useEffect, useRef } from "react";
import UserBubble from "./bubble/UserBubble";

const ChatList = ({bubbles}: {bubbles: string[]}) => {

  // NOTE: 메세지가 올라올 
  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bubbles]);

  return (
    <div className="max-h-full min-w-full h-full flex flex-col no-scrollbar overflow-y-auto">
      {bubbles.map((bubble, index) => (
      <UserBubble key={index} text={bubble} />
    ))}
      <div ref={scrollEndRef}></div>
    </div>
  );
};

export default ChatList;