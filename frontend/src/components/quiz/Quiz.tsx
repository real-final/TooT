import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import QuizHeader from "./QuizHeader";
import QuizContent from "./QuizContent";
import { useDispatch } from "react-redux";
import { Ibubble } from "../../interface/Ibubble";
import { add } from "../../store/slices/bubbleSlice";
import QuizSuccess from "./QuizSuccess";
import QuizFail from "./QuizFail";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAnswer, setIsAnswer] = useState<boolean|null>(null);
  const [quizList, setQuizList] = useState<{word: string, meaning: string}[]>([]);
  const [answer, setAnswer] = useState("");
  const [answerIndex, setAnwserIndex] = useState(-1);
  const {isFetching} = useQuery<any>("daily-quiz", async () => {
    await api.get("/quiz").then(({data}) => {
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
      setIsAnswer(true);
      newBubble.message = "정답입니다! 시드머니 10,000원을 지급해드립니다."
      // TODO: 로그인 고친 후 id 대신 accesstoken으로 백엔드 보내기로 수정하기
      // axios.post("http://localhost:8080/quiz/?id=36", {
      //   "id": 36,
      // });
    }
    else {
      setIsAnswer(false);
      newBubble.message = "오답입니다! 내일 다시 도전해주세요!";
    }
    dispatch(add(newBubble));
  };
  
  useEffect(() => {
    if(isAnswer === true || isAnswer === false){
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    // eslint-disable-next-line
  }, [isAnswer]);

  return (
    <div className="w-full h-full rounded-lg flex flex-col items-center">
      <QuizHeader />
      { isDisabled ? 
          ( isAnswer ? <QuizSuccess /> : <QuizFail /> )
        : <>
        <QuizContent
          answerIndex={answerIndex}
          quizList={quizList}
          isFetching={isFetching}
          getUserAnswer={getUserAnswer}
          isDisabled={isDisabled}
        />
      </>
    }
    </div>
  );
};

export default Quiz;