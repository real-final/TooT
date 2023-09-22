import React from "react";
import { useParams } from "react-router-dom";

import StockCard from "../../common/card/StockCard";
import BuyModal from "./TradeModals/BuyModal";
import SellModal from "./TradeModals/SellModal";
import StockChart from "./stockChart/StockChart";
import StockInfoTabs from "./StockInfoTabs/StockInfoTabs";
import FavoriteItemsCarousel from "../main/FavoriteItemsCarousel";

import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";

/** 주식 상세정보 화면 */
const StockDetails: React.FC = () => {
  const { stockId } = useParams<{ stockId: string }>(); // TODO: stockId로 종목 상세설명, 차트 등을 가져와야 함.
  let items = Array(10).fill(<StockCard item={item} />);
  const [buyModalOpen, setBuyModalOpen] = React.useState<boolean>(false);
  const [sellModalOpen, setSellModalOpen] = React.useState<boolean>(false);

  return (
    <div className="h-full">
      {/* 상단: 좋아요 종목 캐러셀 */}
      <div className="h-1/5">
        <FavoriteItemsCarousel items={items} />
      </div>
      {/* 하단: 상세 종목 조회 Container */}
      <div className="h-4/5 px-6 pb-4">
        <div className="h-full grid grid-rows-6 grid-cols-3 gap-2">
          <div className="row-span-1 col-span-3 flex justify-between items-center">
            {/* 종목명, 로고, 코드 */}
            <ItemTitle stockId={stockId} />
            {/* 매수/매도 버튼 & 모달 */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <BuyButton onClick={() => setBuyModalOpen(true)} />
              <SellButton onClick={() => setSellModalOpen(true)} />
              <BuyModal
                buyModalOpen={buyModalOpen}
                setBuyModalOpen={setBuyModalOpen}
              />
              <SellModal
                sellModalOpen={sellModalOpen}
                setSellModalOpen={setSellModalOpen}
              />
            </Box>
          </div>
          <div className="row-span-5 col-span-2 h-full">
            <StockChart />
          </div>
          <div className="row-span-5 col-span-1 h-full">
            <StockInfoTabs />
          </div>
        </div>
      </div>
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

/** 회사 이름, 로고, 코드 */
const ItemTitle: React.FC<{ stockId?: string }> = ({ stockId }) => {
  if (typeof stockId === "undefined") {
    return <></>;
  }
  return (
    <div className="flex items-center gap-2">
      <Avatar
        alt="회사로고"
        src={
          "https://images.samsung.com/kdp/aboutsamsung/brand_identity/logo/256_144_3.png?$512_288_PNG$"
        }
      />
      <h2 className="text-2xl">삼성전자</h2>
      <p className="text-lg text-gray-400">{stockId}</p>
    </div>
  );
};

/** 매수 버튼 */
const BuyButton = (props: { onClick?: () => void }) => {
  return (
    <Button
      className="h-6"
      color="danger"
      variant="soft"
      onClick={props.onClick}
    >
      매수
    </Button>
  );
};

/** 매도 버튼 */
const SellButton = (props: { onClick?: () => void }) => {
  return (
    <Button
      className="h-6"
      color="primary"
      variant="soft"
      onClick={props.onClick}
    >
      매도
    </Button>
  );
};
