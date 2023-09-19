import UserStockDetailTotal from "./UserStockDetailTotal";

const UserStockDetail = () => {
  return(
    <div className="w-full h-full p-8 min-h-0">
      <div className="h-[10%] text-[36px] mb-8">보유 주식 - </div>
      <UserStockDetailTotal />
      <div className="h-[80%] no-scrollbar overflow-y-auto"></div>
    </div>
  );
};
export default UserStockDetail;