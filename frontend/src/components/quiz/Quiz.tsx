import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import QuizHeader from "./QuizHeader";
import QuizContent from "./QuizContent";
import { useDispatch } from "react-redux";
import { Ibubble } from "../../interface/Ibubble";
import { add } from "../../store/slices/bubbleSlice";

const Quiz = () => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [quizList, setQuizList] = useState<{word: string, meaning: string}[]>([]);
  const [answer, setAnswer] = useState("");
  const [answerIndex, setAnwserIndex] = useState(-1);
  const {isFetching} = useQuery<any>("daily-quiz", async () => {
    await axios.get("http://localhost:8080/quiz/").then(({data}) => {
      console.log(data);
      setQuizList(data.data.quizList);
      setAnswer(data.data.answerString);
      setAnwserIndex(data.data.answerIndex);
    });
  }, {
    staleTime: Infinity,
  });

  const getUserAnswer = (word:string) => {
    setIsDisabled(true);
    const newBubble: Ibubble = {
      message: "",
      speaker: false,
    };
    if(answer === word){
      console.log("정답입니다!");
      newBubble.message = "정답입니다! 시드머니 10,000원을 지급해드립니다."
      // TODO: 로그인 고친 후 id 대신 accesstoken으로 백엔드 보내기로 수정하기
      // axios.post("http://localhost:8080/quiz/?id=36", {
      //   "id": 36,
      // });
    }
    else {
      console.log("오답입니다!");
      newBubble.message = "오답입니다! 내일 다시 도전해주세요!";
    }
    dispatch(add(newBubble));
  };

  return (
  <div className="w-full h-full rounded-lg flex flex-col items-center">
    <QuizHeader />
    <QuizContent answerIndex={answerIndex} quizList={quizList} isFetching={isFetching} getUserAnswer={getUserAnswer} isDisabled={isDisabled} />
    <div className="flex justify-center w-[80%] text-stockRed mt-14">새로고침을 하실 경우 데일리 퀴즈를 풀 수 있는 기회가 사라지니 주의해주세요!</div>
  </div>)
};

export default Quiz;