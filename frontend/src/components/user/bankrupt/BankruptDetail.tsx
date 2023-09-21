import { useLocation, useParams } from "react-router-dom";
import Title from "../../../common/etc/Title";
import BankruptDetailTotal from "./BankruptDetailTotal";
import stockTradeTestData from "../../../test/data/stockTradeTestData";
import UserStockTrade from "../UserStockTrade";

const BankruptDetail = () => {
  const {index} = useParams();
  const location = useLocation();
  const bankrupt = location.state.bankrupt;
  return(
    <div className="w-full h-full p-8 min-h-0">
      <Title title={`${index}회차 파산 기록`} />
      <BankruptDetailTotal bankruptInfo={bankrupt} />
      <div className="h-[70%] no-scrollbar overflow-y-auto">
      {stockTradeTestData.map((item, index) => (
          <UserStockTrade index={index} trade={item} isName={true} />
        ))}
      </div>
    </div>
  );
};

export default BankruptDetail;