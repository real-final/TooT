import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { UserAuthContext } from "../../App";
import { api } from "../../utils/api";

import StockCard from "../../common/card/StockCard";
import StockChart from "./stockChart/StockChart";
import StockInformationTabs from "./stockInformationTabs/StockInformationTabs";
import FavoriteItemsCarousel from "../main/FavoriteItemsCarousel";
import CustomCircularProgress from "../../common/circularProgress/CustomCircularProgress";
import NotFound from "../../common/notfound/NotFound";
import { ItemTitle } from "./stockItemTitle/stockItemTItle";

let item = {
  id: "001230",
  name: "삼성전자",
  price: "100,000",
  difference: "200",
  percentage: "-0.80",
};
// 좋아요 목록 가져오기
const items = Array(10).fill(<StockCard item={item} />);

/** 주식 상세정보 화면 */
const StockDetails: React.FC = () => {
  // 주식 ID 읽기
  const { stockId } = useParams<{ stockId: string }>();

  // Access토큰 가져오기
  const userAuthContext = useContext(UserAuthContext);
  const accessToken = userAuthContext?.accessToken;

  // 종목 정보 가져오기
  const { isLoading, data } = useQuery("stockDetails", async () => {
    const response = await api.get(`/stock/${stockId}`, {
      headers: {
        accesstoken: accessToken,
      },
    });
    const responseData = response?.data;

    // 종목코드가 KOSPI 32에 없을 때
    if (responseData?.error?.code === "MYSQL_NO_DATA") {
      alert("올바른 종목 코드로 조회해주시기 바랍니다.");
      return <NotFound />;
    }

    return responseData?.data;
  });

  if (isLoading) return <CustomCircularProgress />;

  if (typeof stockId === "undefined") return <NotFound />;

  return (
    <div className="h-full">
      {/* 상단: 좋아요 종목 캐러셀 */}
      <div className="h-1/5">
        <FavoriteItemsCarousel items={items} />
      </div>
      {/* 하단: 상세 종목 조회 Container */}
      <div className="h-4/5 px-6 pb-4">
        <div className="h-full grid grid-rows-6 grid-cols-3 gap-2">
          {/* 종목명, 로고, 코드, 매수/매도 버튼 */}
          <div className="row-span-1 col-span-3 flex items-center">
            <ItemTitle stockId={stockId} stockItem={data} />
          </div>
          {/* 종목 그래프 차트 */}
          <div className="row-span-5 col-span-2 h-full">
            <StockChart stockItem={data} />
          </div>
          {/* 종목 정보 */}
          <div className="row-span-5 col-span-1 h-full">
            <StockInformationTabs stockId={stockId} stockItem={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
