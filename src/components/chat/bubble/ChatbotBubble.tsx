const ChatbotBubble = ({text}: {text:string}) => {
  return (<div className="w-fit place-self-start p-[6px] mb-[5px] rounded-lg bg-blue-200 font-light text-[14px] leading-5 text-gray-700">{text}</div>)
};

export default ChatbotBubble;