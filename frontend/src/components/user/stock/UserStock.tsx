import UserStockItem from "./UserStockItem";

const UserStock = () => {
  return (
    <div className="w-full h-full p-8 min-h-0">
      <div className="h-[10%] text-[36px] mb-8">보유 주식</div>
      <div className="h-[90%] no-scrollbar overflow-y-auto">
        <UserStockItem />
        <UserStockItem />
        <UserStockItem />
        <UserStockItem />
      </div>
    </div>
  );
};
export default UserStock;