import { useState } from "react";
import VoiceButton from "./VoiceButton";
import SendButton from "./SendButton";
import type { Ibubble } from "../../../interface/Ibubble";
import { getBubble, sendBubble } from "../../../utils/chat";

const Input = ({addBubble}: {addBubble: (bubble: Ibubble) => void}) => {
  const [inputText, setInputText] = useState<string>("");

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleBubble = async () => {
    await sendBubble(inputText, addBubble);
    await getBubble(inputText, addBubble);
    setInputText("");
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      if(inputText === "") return;
      await handleBubble();
    }
  };

  const handleSendClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(inputText === "") return;
    await handleBubble();
  };

  return (
    <div className="w-full h-9 pl-2.5 pr-1 flex items-center justify-between rounded-full bg-gray-300">
      <VoiceButton />
      <input type="text" autoFocus value={inputText} onChange={handleInputTextChange} className="w-full h-full font-light text-[14px] bg-gray-300 focus:outline-none" onKeyDown={handleKeyDown} ></input>
      <SendButton handleSendClick={handleSendClick} />
    </div>
  );
};

export default Input;