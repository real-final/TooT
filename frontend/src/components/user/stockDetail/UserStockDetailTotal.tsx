import { IstockTestData } from "../../../test/interface/IstockTestData";

const UserStockDetailTotal = ({stock}: {stock:IstockTestData}) => {
  return (
    <div className="font-light bg-lightYellow min-h-0 h-[160px] grid grid-cols-3 grid-rows-3 gap-2.5 p-6 mb-4 rounded-lg border-solid border border-gray-200">
      <div className="col-span-3 row-span-1 text-[24px] font-normal">
        <span className="font-light">총 </span>
        {stock.share}
        <span className="font-light">주</span>
      </div>
      <div className="col-span-1 row-span-1 flex items-end text-base justify-between">
        <div className="text-[16px] text-stockGray font-light">
          순수익(평가손익)
        </div>
        <div className={`text-[20px] font-light ${stock.profit === 0 ? "text-stockGray" : (stock.profit > 0 ? "text-stockRed" : "text-stockBlue")}`}>{stock.profit.toLocaleString()}</div>
      </div>
      <div className="col-span-1 row-span-1 flex items-end text-base justify-between pl-6">
        <div className="text-[16px] text-stockGray font-light">평균단가</div>
        <div className="text-[20px] font-light text-gray-800">{stock.avgPrice.toLocaleString()}</div>
      </div>
      <div className="col-span-1 row-span-1 text-right text-stockGray text-[20px] mt-2.5 font-light">
        평가액
      </div>
      <div className="col-span-1 row-span-1 flex items-end text-base justify-between">
        <div className="text-[16px] text-stockGray font-light">
          수익률(손익률)
        </div>
        <div className={`text-[20px] font-light ${stock.percentage === 0 ? "text-stockGray" : (stock.percentage > 0 ? "text-stockRed" : "text-stockBlue")}`}>{stock.percentage}
        <span className="font-light text-stockGray"> %</span>
        </div>
      </div>
      <div className="col-span-1 row-span-1 flex items-end text-base justify-between pl-6">
        <div className="text-[16px] text-stockGray font-light">현재가</div>
        <div className="text-[20px] font-light text-gray-800">{stock.marketPrice.toLocaleString()}</div>
      </div>
      <div className="flex justify-end items-center col-span-1 row-span-1 text-right text-[32px]">
        <span className="text-gray-800">{stock.totalAsset.toLocaleString()}</span>
        <span className="text-stockGray text-[28px] ml-2.5">원</span>
      </div>
    </div>
  );
};
export default UserStockDetailTotal;