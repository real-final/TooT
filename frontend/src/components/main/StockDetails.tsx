import { useParams } from "react-router-dom";
import Carousel from "../../common/carousel/Carousel";
import StockCard from "../../common/card/StockCard";

/** 주식 상세정보 화면 */
const StockDetails: React.FC = () => {
  const { stockId } = useParams<{ stockId: string }>();
  let items = Array(10).fill(<StockCard item={item} />);

  return (
    <div className="h-full">
      <div className="h-1/5 flex p-6 items-start bg-slate-200 rounded-t-lg">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* <Title>관심 종목</Title> */}
          <div className="flex flex-grow">
            <Carousel items={items} />
          </div>
        </div>
      </div>
      <div className="h-4/5 flex px-6 pt-6">종목코드: {stockId}</div>
    </div>
  );
};

export default StockDetails;

let item = {
  id: "001230",
  name: "삼성전자",
  price: "100,000",
  difference: "200",
  percentage: "-0.80",
};
