import { useLocation, useParams } from "react-router-dom";
import Title from "../../../common/etc/Title";

import UserStockDetailTotal from "./UserStockDetailTotal";
import stockTradeTestData from "../../../test/data/stockTradeTestData";
import UserStockTrade from "../UserStockTrade";

const UserStockDetail = () => {
  // TODO: stockId(종목코드)로 바꾸기
  const { stockName } = useParams<{ stockName: string }>();
  const location = useLocation();
  // TODO: 임시로 연결한 데이터라 유저 상세 주식 조회 페이지에 들어온 후 stock.code(stockId)를 가지고 다시 백엔드에서 주식 정보 가져와야함
  const stock = location.state.stock;
  return(
    <div className="w-full h-full p-8 min-h-0">
      <Title title={`보유 주식 - ${stock.name}`} />
      <UserStockDetailTotal stock={stock} />
      <div className="h-[60%] no-scrollbar overflow-y-auto">
        {stockTradeTestData.map((item, index) => (
          <UserStockTrade index={index} trade={item} />
        ))}
      </div>
    </div>
  );
};
export default UserStockDetail;