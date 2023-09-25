import QuizAnswerButton from "./QuizAnswerButton";

const QuizContent = ({answerIndex, quizList, isFetching, getUserAnswer, isDisabled}: {
    answerIndex:number, quizList:{word:string, meaning:string}[], isFetching:boolean, getUserAnswer:(word:string) => void, isDisabled:boolean}) => {
    return (
        <>
            <div className="mt-8 font-light w-[80%] h-[60%] p-8 text-[24px] rounded-lg bg-white flex items-center justify-center text-stockBlue border border-solid border-gray-200">
                {quizList[answerIndex]?.meaning}
            </div>
            { isFetching ? <div>데일리 퀴즈를 가져오는 중</div> 
            : (<div className="w-[80%] mt-12 flex justify-between">
                {quizList.map((items, index) => <QuizAnswerButton key={index} index={index + 1} word={items.word} sendUserAnswer={getUserAnswer} isDisabled={isDisabled} />)}
            </div>)}
        </>
    );
};

export default QuizContent;