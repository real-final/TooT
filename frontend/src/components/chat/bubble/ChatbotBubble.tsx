const ChatbotBubble = ({type, text, url}: {type: string | undefined, text:string, url:string | undefined}) => {
  return ( 
    type === "text" ?
    <div className="w-fit place-self-start p-[6px] mb-[5px] rounded-lg bg-blue-200 font-light text-[14px] leading-5 text-gray-700">{text}</div>
    : <>
      <img src={url} className="w-[90%] rounded-lg mb-[5px]" alt="" />
      <div className="w-fit place-self-start p-[6px] mb-[5px] rounded-lg bg-blue-200 font-light text-[14px] leading-5 text-gray-700">
        {text}
      </div>
    </>
  );
};

export default ChatbotBubble;