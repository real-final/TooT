import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

import daily_quiz from "../../assets/gifs/daily_quiz.gif";
import login from "../../assets/gifs/login.gif";

interface Itab {
  fileName: string;
  index: number;
  value: number;
  file: any;
}

const Tutorials = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div className="w-full h-full p-6 min-h-0 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-full text-[28px] text-gray-800 font-normal">
            튜토리얼
          </div>
          <Box className="w-full">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="로그인" />
              <Tab label="데일리 퀴즈" />
            </Tabs>
          </Box>
        </div>
        <FontAwesomeIcon
          icon={faArrowAltCircleLeft}
          onClick={() => navigate(-1)}
          className="cursor-pointer text-[#1E2731] w-[36px] h-[36px]"
        />
      </div>
      <CustomTab fileName="로그인" index={0} value={value} file={login} />
      <CustomTab
        fileName="데일리 퀴즈"
        index={1}
        value={value}
        file={daily_quiz}
      />
    </div>
  );
}

const CustomTab = (tab: Itab) => {
  const {fileName, index, value, file} = tab;
  if(value === index) {
    return (
    <div role="tabpanel" id={String(index)} className="w-full flex justify-center items-center h-[90%]">
      <img src={file} alt={fileName} className="h-[100%]" />
    </div>);
  } else {
    return null;
  }
};

export default Tutorials;