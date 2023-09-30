import { useContext, useEffect, useState } from "react";
import Quiz from "./Quiz";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pushBotBubble } from "../../utils/chat/chat";
import QuizEnd from "./QuizEnd";
import { api } from "../../utils/api";
import { UserAuthContext } from "../../App";

const QuizContainer = () => {
  const [isSolved, setIsSolved] = useState<boolean | null>(null);
  const userAuthContext = useContext(UserAuthContext);
  const accessToken = userAuthContext?.accessToken;
  console.log("컨테이너 안");
  console.log(accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect 안");
    console.log(accessToken);
    api.get("/quiz/today", {
      headers: {
        accesstoken: accessToken,
      },
    }).then(({data}) => {
      console.log(data);
      setIsSolved(data.data.success);
    });
  }, []);

  useEffect(() => {
    if(isSolved === false){
      const message = "오늘의 주식 용어 데일리 퀴즈에 이미 도전하셨습니다.\n내일 다시 도전해주세요!";
      pushBotBubble(message, dispatch);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else if(isSolved === true){
      const message = "오늘의 주식 용어 데일리 퀴즈를 진행합니다.";
      pushBotBubble(message, dispatch);
    }
    //eslint-disable-next-line
  }, [isSolved]);

  return(
  <div className="w-full h-full p-8 min-h-0 flex justify-center items-center bg-white">
    {(isSolved === false) ? <QuizEnd /> : <Quiz />}
  </div>
  );
};
export default QuizContainer;