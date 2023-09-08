import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone} from "@fortawesome/free-solid-svg-icons";

const VoiceButton = () => {
  return (
    <div className="w-[20px] h-[20px] flex justify-center items-center mr-[10px] text-slate-600">
      <FontAwesomeIcon className="hover:cursor-pointer" icon={faMicrophone} />
    </div>
  );
};

export default VoiceButton;