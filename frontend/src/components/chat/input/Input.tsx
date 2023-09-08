import { useState } from "react";
import VoiceButton from "./VoiceButton";
import SendButton from "./SendButton";

const Input = ({addBubble}: {addBubble: (bubble: string) => void}) => {
  const [inputText, setInputText] = useState<string>("");

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      addBubble(inputText);
      setInputText("");
    }
  };

  const handleSendClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(inputText === "") return;
    addBubble(inputText);
    setInputText("");
  };

  return (
    <div className="w-full h-[40px] pl-[10px] pr-[2px] flex items-center justify-between rounded-full bg-gray-300">
      <VoiceButton />
      <input type="text" autoFocus value={inputText} onChange={handleInputTextChange} className="w-full h-full bg-gray-300 focus:outline-none" onKeyDown={handleKeyDown} ></input>
      <SendButton handleSendClick={handleSendClick} />
    </div>
  );
};

export default Input;