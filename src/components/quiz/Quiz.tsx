const Quiz = () => {
  return (
  <div className="w-full h-full rounded-lg flex flex-col items-center">
    <div className="p-8 flex flex-col items-center w-full rounded-t-lg bg-cover bg-money">
      <div className="mt-8 text-[48px] w-full pb-8 text-center text-white">데일리 주식 퀴즈</div>
      <div className="pb-4 mt-4 text-[28px] text-white">Q. 다음 중 해당 설명에 부합하는 단어는 ?</div>
    </div>
    <div className="mt-8 font-light w-[80%] h-[60%] p-8 text-[24px] rounded-lg bg-white flex items-center justify-center text-stockBlue border border-solid border-gray-200">개별 주식이 하루에 오를 수 있는 최고 한도의 가격</div>
    <div className="w-[80%] mt-12 flex justify-between">
      <div className="text-[28px] bg-white rounded-full p-4 border border-solid border-gray-200 hover:bg-lightYellow cursor-pointer">1. 매수</div>
      <div className="text-[28px] bg-white rounded-full p-4 border border-solid border-gray-200 transition ease-in-out hover:bg-stockBlue hover:text-white cursor-pointer">2. 매도</div>
      <div className="text-[28px] bg-white rounded-full p-4 border border-solid border-gray-200">3. 상한가</div>
      <div className="text-[28px] bg-white rounded-full p-4 border border-solid border-gray-200">4. 호가</div>
    </div>
    <div className="flex justify-center w-[80%] text-stockRed mt-14">새로고침을 하실 경우 데일리 퀴즈를 풀 수 있는 기회가 사라지니 주의해주세요!</div>
  </div>)
};

export default Quiz;