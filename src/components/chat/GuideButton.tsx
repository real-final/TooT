import { useNavigate } from "react-router-dom";

const GuideButton = ({text, url}: {text: string, url: string}) => {
  const navigate = useNavigate();
  const handleGuideButtonClick = () => {
    navigate(url);
  };
  return (
    <button onClick={handleGuideButtonClick}>{text}</button>
  );
};

export default GuideButton;