import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const GuideButton = ({buttonName, isIcon, icon, url, iconColor, moveUrlTo} : 
  {buttonName:string, 
    icon?: IconProp,
    isIcon?: boolean,
    url?: string,
    iconColor?: string,
    moveUrlTo?: (url:string) => void
  }) => {
  const handleGuideButtonClick = () => {
    if(moveUrlTo && url) moveUrlTo(url);
  };

  return (
    <button
      className="text-stockGray rounded-full border border-solid border-gray-200 border-b-2 border-r-2 text-[13px] p-2 mr-1 min-w-[26%] flex justify-around items-center"
      onClick={handleGuideButtonClick}
    >
      {buttonName}
      {isIcon && icon ? 
        <FontAwesomeIcon icon={icon} className={`ml-0.5 ${iconColor}`} />
       : null }
    </button>
  );
};

export default GuideButton;