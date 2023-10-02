import { useState, useContext, useEffect } from "react";
import { UserAuthContext } from "../../../App";
import { useQuery } from "react-query";
import { api } from "../../../utils/api";

import StockOrderModal from "./StockOrderModal";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";

import { IstockItem } from "../../../interface/IstockDetails";
import { IstockTheme } from "../../../interface/IstockTradingModal";
import CustomCircularProgress from "../../../common/circularProgress/CustomCircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

/** 회사 이름, 로고, 코드 */
export const ItemTitle: React.FC<{
  stockId: string;
  stockItem: IstockItem;
}> = ({ stockId, stockItem }) => {
  // 매수/매도 모달 On/Off 트리거
  const [buyModalOpen, setBuyModalOpen] = useState<boolean>(false);
  const [sellModalOpen, setSellModalOpen] = useState<boolean>(false);

  // 보유현금 가져오기
  const userAuthContext = useContext(UserAuthContext);
  const cash = userAuthContext?.userInfo?.cash as number;

  // Access 토큰 가져오기
  const accessToken = userAuthContext?.accessToken as string;

  // 현재 시가 가져오기
  const currentPrice = stockItem.currentPrice;

  // 챗봇을 통해 이동했으면 사용자가 원하는 매수/매도 데이터 가져오기
  const chat = useSelector((state: RootState) => state.stock);

  useEffect(() => {
    if(chat.tradeType !== null && chat.tradeType !== undefined && chat.tradeType !== ""){
      if(chat.tradeType === "sell"){
        setSellModalOpen(true);
      } else if (chat.tradeType === "buy") {
        setBuyModalOpen(true);
      }
    }
  }, [chat.tradeType]);

  // 보유주식 수량 가져오기
  const { data, isLoading } = useQuery(
    "my-stocks",
    async () => {
      try {
        const response = await api.get(`stock/my/${stockId}`, {
          headers: {
            accesstoken: accessToken,
          },
          data: {
            stockId: stockId,
          },
        });

        return response?.data?.data;
      } catch {
        console.error("위치:stockItemITtle.tsx, 보유주식수량 가져오기 실패");
      }
    },
    { retry: 0 }
  );

  if (isLoading) return <CustomCircularProgress />;

  const hold = data?.hold;
  const stockName = data?.stockName;

  // 사용자 금융 정보
  const stockTradingInfo = {
    buy: {
      accessToken: accessToken, // Access 토큰
      stockName: stockName, // 종목이름
      stockId: stockId, // 종목코드
      currentPrice: currentPrice, // 현재시가
      availableQuantity: Math.floor(cash / currentPrice), // 주문 가능 수량
    },
    sell: {
      accessToken: accessToken, // Access 토큰
      stockName: stockName, // 종목이름
      stockId: stockId, // 종목코드
      currentPrice: currentPrice, // 현재시가
      availableQuantity: hold, // 주문 가능 수량
    },
  };
  // 매수/매도 모달 테마
  const theme: IstockTheme = {
    buy: { title: "매수", color: "danger", textColor: "text-red-700" },
    sell: { title: "매도", color: "primary", textColor: "text-blue-700" },
  };

  return (
    <div className="w-full flex justify-between">
      {/* 종목명, 로고, 코드 */}
      <Box
        sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}
      >
        <Avatar alt="회사로고" src={stockItem.imageUrl} size="sm" />
        <h2 className="text-2xl mx-1">{stockItem?.stockName}</h2>
        <p className="text-md text-gray-400">코스피32 {stockId}</p>
      </Box>
      {/* 매수/매도 버튼 & 모달 */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <BuyButton onClick={() => setBuyModalOpen(true)} />
        <SellButton onClick={() => setSellModalOpen(true)} />
        <StockOrderModal
          modalOpen={buyModalOpen}
          setModalOpen={setBuyModalOpen}
          stockTradingInfo={stockTradingInfo.buy}
          theme={theme.buy}
        />
        <StockOrderModal
          modalOpen={sellModalOpen}
          setModalOpen={setSellModalOpen}
          stockTradingInfo={stockTradingInfo.sell}
          theme={theme.sell}
        />
      </Box>
    </div>
  );
};

/** 매수 버튼 */
export const BuyButton = (props: { onClick?: () => void }) => {
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
export const SellButton = (props: { onClick?: () => void }) => {
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
