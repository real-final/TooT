import { useNavigate } from "react-router-dom";
import { IbankruptTestData } from "../../../test/interface/IbankruptTestData";

const BankruptItem = ({bankrupt}: {bankrupt:IbankruptTestData}) => {
  const navigate = useNavigate();

  const handleBankruptClick = () => {
    navigate(bankrupt.index.toString(), {state:{bankrupt:bankrupt}});
  };

  return (
    <div onClick={handleBankruptClick} className="cursor-pointer text-stockGray font-extralight h-14 pl-4 pr-4 pt-2 pb-2 mb-4 rounded-lg border border-solid border-gray-200 grid grid-cols-8 grid-rows-1">
      <div className="col-span-1 flex items-center text-gray-800 font-light text-lg">{bankrupt.index}회차</div>
      <div className="col-span-1 flex items-center">{bankrupt.date}</div>
      <div className="col-span-1 flex items-center"></div>
      <div className="col-span-1 flex items-center">최종 평가액</div>
      <div className="col-span-2 flex items-center justify-end text-gray-800 font-light text-lg">
        {bankrupt.finalAsset}
        <span className="text-stockGray ml-1">원</span>
      </div>
      <div className="col-span-1 flex items-center justify-end">손익률</div>
      <div className="col-span-1 flex items-center justify-end font-light text-stockBlue text-lg">
        {bankrupt.percentage}
        <span className="text-stockGray ml-1">%</span>
      </div>
    </div>
  );
}
export default BankruptItem;