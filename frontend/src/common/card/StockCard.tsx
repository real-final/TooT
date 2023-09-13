import { useNavigate } from "react-router-dom";
import Card from "./Card";
import getStockStyle from "../../utils/getStockStyle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

type Item = {
  id: string;
  name: string;
  price: string;
  difference: string;
  percentage: string;
};

type StockCardProps = {
  item?: Item; // 나중에 optional modifier("?") 지워야함!!!!!
};

/** 주식종목 카드 */
const StockCard: React.FC<StockCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const { textColor, icon } = getStockStyle(item?.percentage as string);

  const handleCardClick = () => {
    navigate(`/stock/${item?.id}`);
  };

  return (
    <button className="w-[180px]" onClick={handleCardClick}>
      <Card>
        <div className="h-full flex flex-col justify-between relative">
          <LikeButton />
          <div className="flex items-start">
            <p className="text-xs text-slate-500 mr-2">{item?.id}</p>
            <p className="text-xs text-slate-500">코스피200</p>
          </div>
          <div className="flex items-start">
            <h2 className="text-sm">{item?.name}</h2>
          </div>
          <div className="flex items-center">
            <p className={"text-lg mr-2 " + textColor}>{item?.price}</p>
            <p className={"text-xs text-center " + textColor}>
              {icon} {item?.difference}({item?.percentage}%)
            </p>
          </div>
        </div>
      </Card>
    </button>
  );
};

export default StockCard;

/** 좋아요 버튼 */
const LikeButton: React.FC = () => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <FontAwesomeIcon
      onClick={handleClick}
      icon={faHeart}
      style={{
        color: "#b0b0b0",
        width: "15px",
        height: "15px",
        position: "absolute",
        top: "0",
        right: "0",
      }}
    />
  );
};
