import { useState } from "react";
import { useQuery } from "react-query";
import VoiceButton from "./VoiceButton";
import SendButton from "./SendButton";
import type { Ibubble } from "../../../interface/Ibubble";
import axios from "axios";

const Input = ({addBubble}: {addBubble: (bubble: Ibubble) => void}) => {
  const [inputText, setInputText] = useState<string>("");

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      if(inputText === "") return;
      await sendBubble(inputText);
      await getBubble(inputText);
    }
  };

  const handleSendClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(inputText === "") return;
    await sendBubble(inputText);
    await getBubble(inputText);
  };

  const sendBubble = (text:string) => {
    const newBubble: Ibubble = {
      message: text,
      speaker: true
    };
    addBubble(newBubble);
    setInputText("");
  };

  const getBubble = (text:string) => {
    const newBubble: Ibubble = {
      message:"",
      speaker: false
    };
    addBubble(newBubble);
  };

  return (
    <div className="w-full h-9 pl-2.5 pr-1 flex items-center justify-between rounded-full bg-gray-300">
      <VoiceButton />
      <input type="text" autoFocus value={inputText} onChange={handleInputTextChange} className="w-full h-full bg-gray-300 focus:outline-none" onKeyDown={handleKeyDown} ></input>
      <SendButton handleSendClick={handleSendClick} />
    </div>
  );
};

export default Input;