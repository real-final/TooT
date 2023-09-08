import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SendButton = ({handleSendClick}: {handleSendClick: (e: React.MouseEvent<HTMLButtonElement>) => void}) => {
  return(
    <button className="min-w-[30px] w-[30px] h-[30px] mt-[3px] mb-[3px] ml-[5px] rounded-full bg-blue-400 text-white focus:outline-none" onClick={handleSendClick}>
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  );
};

export default SendButton;