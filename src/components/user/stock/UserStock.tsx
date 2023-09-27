import UserStockItem from "./UserStockItem";
import stockTestData from "../../../test/data/stockTestData";
import Title from "../../../common/etc/Title";

const UserStock = () => {
  return (
    <div className="w-full h-full p-8 min-h-0">
      <Title title="보유 주식" />
      <div className="h-[90%] no-scrollbar overflow-y-auto">
        {stockTestData.map((item, index) => (
          <UserStockItem key={index} stock={item} index={index} />
        ))}
      </div>
    </div>
  );
};
export default UserStock;