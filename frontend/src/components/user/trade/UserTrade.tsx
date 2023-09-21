import Title from "../../../common/etc/Title";
import stockTradeTestData from "../../../test/data/stockTradeTestData";
import UserStockTrade from "../UserStockTrade";

const UserTrade = () => {
  return(
    <div className="w-full h-full p-8 min-h-0">
      <Title title="주식 거래 내역" />
      <div className="h-[90%] no-scrollbar overflow-y-auto">
        {/* TODO: 유저 주식 거래 내역 데이터 BE 연동하기 */}
        {stockTradeTestData.map((item, index) => (
          <UserStockTrade index={index} trade={item} isName={true} />
        ))}
      </div>
    </div>
  );
};

export default UserTrade;