const ChatbotBubble = ({text}: {text:string}) => {
  return (<div className="w-fit place-self-start p-[10px] mb-[5px] rounded-lg bg-blue-200">{text}</div>)
};

export default ChatbotBubble;