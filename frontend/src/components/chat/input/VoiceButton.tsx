import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone} from "@fortawesome/free-solid-svg-icons";

const VoiceButton = () => {
  return (
    <div className="w-5 h-5 flex justify-center items-center mr-2.5 text-slate-600">
      <FontAwesomeIcon className="hover:cursor-pointer" icon={faMicrophone} />
    </div>
  );
};

export default VoiceButton;