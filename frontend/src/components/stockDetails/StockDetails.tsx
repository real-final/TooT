import React from "react";
import { useParams } from "react-router-dom";

import Carousel from "../../common/carousel/Carousel";
import StockCard from "../../common/card/StockCard";
import BuyModal from "./TradeModals/BuyModal";
import SellModal from "./TradeModals/SellModal";

import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

/** 주식 상세정보 화면 */
const StockDetails: React.FC = () => {
  const { stockId } = useParams<{ stockId: string }>();
  let items = Array(10).fill(<StockCard item={item} />);
  const [buyModalOpen, setBuyModalOpen] = React.useState<boolean>(false);
  const [sellModalOpen, setSellModalOpen] = React.useState<boolean>(false);

  return (
    <div className="h-full">
      {/* <Title>관심 종목</Title> */}
      <div className="h-1/5 flex p-6 items-start bg-slate-200 rounded-t-lg">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-grow">
            <Carousel items={items} />
          </div>
        </div>
      </div>
      {/* <Body>상세 종목 조회 화면</Body> */}
      <div className="h-4/5 flex flex-col px-6 pt-6">
        <p>종목코드: {stockId}</p>
        {/* 매수/매도 버튼 & 모달 */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            onClick={() => setBuyModalOpen(true)}
            color="danger"
            variant="soft"
            size="sm"
          >
            매수
          </Button>
          <Button
            onClick={() => setSellModalOpen(true)}
            color="primary"
            variant="soft"
            size="sm"
          >
            매도
          </Button>
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
