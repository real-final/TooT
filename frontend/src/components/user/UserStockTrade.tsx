import { IstockTradeData } from "../../test/interface/IstockTradeData";

const UserStockTrade = ({index, trade}: {index:number, trade:IstockTradeData}) => {
  return (
    <div className="font-extralight grid grid-cols-8 h-12 grid-rows-1 pl-4 pr-4 pt-2 pb-2 rounded-lg border border-solid mb-4 border-gray-200">
      <div className="col-span-1 flex items-center text-stockGray">
        {trade.date}
      </div>
      <div
        className={`col-span-1 flex items-center ${
          trade.type ? "text-stockRed" : "text-stockBlue"
        }`}
      >
        {trade.type ? "매수" : "매도"}
      </div>
      <div className="col-span-1 text-stockGray flex items-center">거래 수량</div>
      <div className="col-span-1 flex items-center text-gray-800 font-light text-lg">
        {trade.share.toLocaleString()}
        <span className="text-stockGray">주</span>
      </div>
      <div className="text-stockGray col-span-1 flex items-center">거래 단가</div>
      <div className="col-span-1 flex items-center text-gray-800 font-light text-lg">{trade.tradePrice.toLocaleString()}</div>
      <div className="text-stockGray col-span-1 flex items-center">{trade.type ? "매수금" : "매입금"}</div>
      <div className="col-span-1 flex items-center justify-end text-gray-800 font-light text-lg">{trade.totalPrice.toLocaleString()}</div>
    </div>
  );
};
export default UserStockTrade;