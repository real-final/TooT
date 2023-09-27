import { useNavigate } from "react-router-dom";
import { getStockStyle } from "../../utils/getStockStyle";

import Card from "./Card";

import IconButton from "@mui/joy/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

type Item = {
  id: string;
  name: string;
  price: string;
  difference: string;
  percentage: string;
};

type StockCardProps = {
  item?: Item; // TODO: 나중에 optional modifier("?") 지워야함!!!!!
};

/** 주식종목 카드 */
const StockCard: React.FC<StockCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const { textColor, icon } = getStockStyle(item?.percentage as string);

  const handleCardClick = () => {
    navigate(`/stock/${item?.id}`);
  };

  return (
    <div className="w-[198px]" onClick={handleCardClick}>
      <Card className="hover:cursor-pointer">
        <div className="h-full flex flex-col justify-between relative">
          <LikeButton />
          <div className="flex items-start">
            <p className="text-xs text-slate-500 mr-2">{item?.id}</p>
            <p className="text-xs text-slate-500">코스피200</p>
          </div>
          <div className="flex items-start">
            <h2 className="text-md">{item?.name}</h2>
          </div>
          <div className="flex items-center">
            <p className={"text-xl mr-2 " + textColor}>{item?.price}</p>
            <p className={"text-xs text-center " + textColor}>
              {icon} {item?.difference}({item?.percentage}%)
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
