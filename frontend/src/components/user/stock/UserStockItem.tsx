const UserStockItem = (
//   {stock}: {stock:{
//   name: string,
//   share: number,
//   profit: number,
//   percentage: number,
//   avgPrice: number,
//   marketPrice: number,
//   totalAsset: number,
// }}
) => {
  return (
    <div className="min-h-0 grid grid-cols-3 grid-rows-3 gap-2.5 p-4 mb-4 rounded-lg border-solid border border-gray-200">
      <div className="col-span-2 row-span-1 text-[24px]">삼성전자</div>
      <div className="col-span-1 row-span-1 text-[20px] text-right">2주</div>
      <div className="col-span-1 row-span-1 flex text-base justify-between">
        <div className="text-[16px] text-stockGray font-light">순수익(평가손익)</div>
        <div className="text-[20px] text-stockBlue font-light">-22,759</div>
      </div>
      <div className="col-span-1 row-span-1 flex text-base justify-between pl-6">
        <div className="text-[16px] text-stockGray font-light">평균단가</div>
        <div className="text-[20px] font-light">80,266</div>
      </div>
      <div className="col-span-1 row-span-1 text-right text-[16px] text-stockGray text-base font-light">
        평가금
      </div>
      <div className="col-span-1 row-span-1 flex text-base justify-between">
        <div className="text-[16px] text-stockGray font-light">수익률(손익률)</div>
        <div className="text-[20px] text-stockBlue font-light">-16.19%</div>
      </div>
      <div className="col-span-1 row-span-1 flex text-base justify-between pl-6">
        <div className="text-[16px] text-stockGray font-light">현재가</div>
        <div className="text-[20px] font-light">70,266</div>
      </div>
      <div className="col-span-1 row-span-1 text-right text-[24px]">
        <span className="">143,800</span>
        <span className="text-stockGray"> 원</span>
      </div>
    </div>
  );
};

export default UserStockItem;