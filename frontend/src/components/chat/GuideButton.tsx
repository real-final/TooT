const GuideButton = ({buttonName} : {buttonName:string}) => {

  const handleGuideButtonClick = () => {
    console.log(buttonName);
  };

  return (
    <button onClick={handleGuideButtonClick}>{buttonName}</button>
  );
};

export default GuideButton;