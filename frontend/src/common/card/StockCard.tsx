import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getStockStyle } from "../../utils/getStockStyle";
import { api } from "../../utils/api";
import { UserAuthContext } from "../../App";

import Card from "./Card";
import LikeButton from "../button/LikeButton";

export type Item = {
  stockId: string;
  stockName: string;
  currentPrice: string;
  priceDifference: string;
  rateDifference: string;
};

type StockCardProps = {
  item: Item;
  size: "small" | "big";
};

/** 주식종목 카드 */
const StockCard: React.FC<StockCardProps> = ({ item, size }) => {
  const navigate = useNavigate();
  const stockId = item.stockId;
  const { textColor, icon } = getStockStyle(item?.rateDifference as string);

  // 상세조회 페이지 이동
  const handleCardClick = () => {
    navigate(`/stock/${stockId}`);
  };

  // Access 토큰 가져오기
  const userAuthContext = useContext(UserAuthContext);
  const accessToken = userAuthContext?.accessToken as string;

  const width = size === "big" ? "w-[300px] " : "w-[198px] ";
  const xsText = size === "big" ? "text-[14px]" : "text-xs";
  const mdText = size === "big" ? "text-[20px]" : "text-md";
  const xlText = size === "big" ? "text-[24px]" : "text-xl";

  // 종목 정보 가져오기
  const { data } = useQuery(["stock-details", stockId], async () => {
    const response = await api.get(`/stock/${stockId}`, {
      headers: {
        accesstoken: accessToken,
      },
    });
    const responseData = await response?.data;
    return responseData;
  });

  // 좋아요 여부 저장
  const isFavorite = data?.data?.interested;

  return (
    <div className={`${width}`} onClick={handleCardClick}>
      <Card className="hover:cursor-pointer" size={size}>
        <div className="h-full flex flex-col justify-between relative">
          <div className="absolute right-0 top-0">
            <LikeButton
              stockId={stockId}
              isFavorite={isFavorite}
              size="small"
            />
          </div>
          <div className="flex items-start">
            <p className={`${xsText} text-slate-500 mr-2`}>{stockId}</p>
            <p className={`${xsText} text-slate-500`}>코스피200</p>
          </div>
          <div className="flex items-start">
            <h2 className={`${mdText}`}>{item?.stockName}</h2>
          </div>
          <div className="flex items-center">
            <p className={`${xlText} mr-2 ` + textColor}>
              {item?.currentPrice.toLocaleString()}
            </p>
            <p className={`${xsText} text-center ` + textColor}>
              {icon} {item?.priceDifference}({item?.rateDifference}%)
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockCard;
