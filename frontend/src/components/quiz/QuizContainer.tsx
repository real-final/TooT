import { useEffect, useState } from "react";
import Quiz from "./Quiz";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pushBotBubble } from "../../utils/chat/chat";
import QuizEnd from "./QuizEnd";

const QuizContainer = () => {
  const [isSolved, setIsSolved] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // axios.get("http://localhost:8080/quiz/today?id=36").then(({data}) => {
    //   setIsSolved(data.data);
    //   console.log(data);
    // }).catch((err) => console.log(err));
    //setIsSolved(true);
    setIsSolved(false);
  }, []);

  useEffect(() => {

    if(isSolved === true){
      const message = "오늘의 주식 용어 데일리 퀴즈에 이미 도전하셨습니다.\n내일 다시 도전해주세요!";
      pushBotBubble(message, dispatch);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else if(isSolved === false){
      const message = "오늘의 주식 용어 데일리 퀴즈를 진행합니다.";
      pushBotBubble(message, dispatch);
    }
    //eslint-disable-next-line
  }, [isSolved]);

  return(
  <div className="w-full h-full p-8 min-h-0 flex justify-center items-center bg-white">
    {(isSolved === true) ? <QuizEnd /> : <Quiz />}
  </div>
  );
};
export default QuizContainer;