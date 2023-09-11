const MiniRankingItem = ({user, index}:{user: {
  profile: string,
  nickname: string,
  profit: number,
  gameover: number
}, index: number}) => {
  return (
    <tr className="w-full">
      <td align="center" className={`text-[28px] align-middle ${index === 0 ? "text-first " : " "}${index === 1 ? "text-second " : " "}${index === 2 ? "text-third " : " "}`}>{index + 1}</td>
      <td align="center" className="w-[40px] h-[40px] rounded-full bg-point align-middle">{user.profile}</td>
      <td align="center" className="text-[20px] align-middle">{user.nickname}</td>
      <td align="right" className={`text-[20px] align-middle ${user.profit > 0 ? "text-stockRed" : "text-stockBlue"}`}>{user.profit.toLocaleString('ko-KR')}<span className="text-stockGray"> 원</span></td>
      <td align="right" className="text-[14px] align-middle text-stockGray">파산 {user.gameover}회</td>
    </tr>
  );
};

export default MiniRankingItem;