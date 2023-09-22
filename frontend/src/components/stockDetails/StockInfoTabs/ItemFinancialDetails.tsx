import { ItemOverviewHeader } from "./StockInfoTabs";

/** 상세조회 페이지 재무정보 */
const ItemFinancialDetails: React.FC = () => {
  return (
    <div>
      <div className="h-1/4">
        {/* 종목 프로필(로고, 이름, 코드) */}
        <ItemOverviewHeader />
      </div>
      <div className="h-3/4">재무정보</div>
    </div>
  );
};

export default ItemFinancialDetails;
