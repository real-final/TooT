import { useNavigate } from "react-router-dom";
import { getStockStyle } from "../../utils/getStockStyle";

import Card from "./Card";

import IconButton from "@mui/joy/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

type Item = {
  stockId: string;
  stockName: string;
  currentPrice: string;
  priceDifferenct: string;
  rateDifference: string;
};

type StockCardProps = {
  item: Item;
  size?: string;
};

/** 주식종목 카드 */
const StockCard: React.FC<StockCardProps> = ({ item, size }) => {
  const navigate = useNavigate();

  const { textColor, icon } = getStockStyle(item?.rateDifference as string);

  const handleCardClick = () => {
    navigate(`/stock/${item?.stockId}`);
  };

  const width = (size === "big") ? "w-[300px] " : "w-[200px] ";
  const xsText = (size === "big") ? "text-[14px]" : "text-xs";
  const mdText = (size === "big") ? "text-[20px]" : "text-md";
  const xlText = (size === "big") ? "text-[24px]" : "text-xl";

  return (
    <div className={`${width}`} onClick={handleCardClick}>
      <Card className="hover:cursor-pointer" size="big" >
        <div className="h-full flex flex-col justify-between relative p-2">
          <LikeButton />
          <div className="flex items-start">
            <p className={`${xsText} text-slate-500 mr-2`}>{item?.stockId}</p>
            <p className={`${xsText} text-slate-500`}>코스피200</p>
          </div>
          <div className="flex items-start">
            <h2 className={`${mdText}`}>{item?.stockName}</h2>
          </div>
          <div className="flex items-center">
            <p className={`${xlText} mr-2 ` + textColor}>{item?.currentPrice.toLocaleString()}</p>
            <p className={`${xsText} text-center ` + textColor}>
              {icon} {item?.priceDifferenct}({item?.rateDifference}%)
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockCard;

/** 좋아요 버튼 */
const LikeButton: React.FC = () => {
  const handleLikeButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <IconButton
      onClick={handleLikeButtonClick}
      color="neutral"
      variant="plain"
      sx={{
        "--IconButton-size": "20px",
      }}
      style={{
        position: "absolute",
        top: "0",
        right: "0",
      }}
    >
      <FavoriteBorder fontSize="small" />
    </IconButton>
  );
};
