import { useEffect, useState } from "react";
import Quiz from "./Quiz";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizContainer = () => {
  const [isSolved, setIsSolved] = useState<boolean | null>(null);
  const navigate = useNavigate();

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
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    //eslint-disable-next-line
  }, [isSolved]);

  return(
  <div className="w-full h-full p-8 min-h-0 flex justify-center items-center bg-white">
    {(isSolved === true || isSolved === null || isSolved === undefined) ? 
    <div className="flex flex-col items-center">
      <div className="text-[36px]">오늘의 데일리 퀴즈를 이미 도전했습니다.</div>
      <div className="mt-10 text-[36px]">내일 다시 도전해주세요!</div>
      <div className="mt-10 text-[36px]">5초 후 메인 페이지로 이동합니다.</div>
    </div> : <Quiz />}
  </div>
  );
};
export default QuizContainer;