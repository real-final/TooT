const UserRanking = ({index, user}:{index:number, user:{
  profile: string,
  nickname: string,
  profit: number,
  gameover: number
}}) => {
  return (
    <div className="flex items-center justify-around w-[80%] p-2 bg-lightYellow border-solid border rounded-lg border-gray-200">
      <div
        className={`text-[52px] align-middle ${
          index === 0 ? "text-first " : " "
        }${index === 1 ? "text-second " : " "}${
          index === 2 ? "text-third " : " "
        }`}
      >
        {index + 1}
      </div>
      <div className={`w-[80px] h-[80px] rounded-full bg-point align-middle`}>
        {user.profile}
      </div>
      <div className={`text-[28px] align-middle`}>{user.nickname}</div>
      <div
        className={`text-[28px] align-middle ${
          user.profit > 0 ? "text-stockRed" : "text-stockBlue"
        }`}
      >
        {user.profit.toLocaleString("ko-KR")}
        <span className="text-stockGray"> 원</span>
      </div>
      <div className={`text-[20px] align-middle text-stockGray`}>파산 {user.gameover}회</div>
    </div>
  );
};

export default UserRanking;