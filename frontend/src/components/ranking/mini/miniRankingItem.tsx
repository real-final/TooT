const MiniRankingItem = ({user, index}:{user: {
  profile: string,
  nickname: string,
  profit: number,
  gameover: number
}, index: number}) => {
  return (
    <div className="flex items-center">
      <div className="text-[36px]">{index + 1}</div>
      <div className="w-[40px] h-[40px] rounded-full bg-point">{user.profile}</div>
      <div className="text-[16px]">{user.nickname}</div>
      <div className="text-[16px]">{user.profit}원</div>
      <div className="text-[16px]">파산{user.gameover}회</div>
    </div>
  );
};

export default MiniRankingItem;