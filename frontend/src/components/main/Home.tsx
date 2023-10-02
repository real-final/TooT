import { ReactNode } from "react";
import FavoriteItemsCarousel from "./FavoriteItemsCarousel";
import TotalRanking from "./totalRanking/TotalRanking";
import CustomCircularProgress from "../../common/circularProgress/CustomCircularProgress";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import StockRow from "./topTrandingStocks/StockRow";
import { Tooltip } from "@mui/material";

const Home: React.FC = () => {
  // TODO: 좋아요 목록 가져오기
  let items = Array(0);

  type rowType = {
    rank: number;
    stockId: string;
    stockName: string;
    price: number;
    rateDifference: string;
  };
  
  /** 거래량 순위 */
    const navigate = useNavigate();
  
    // 거래량 순위 요청하기
    const fetchStockRank = async () => {
      const response = await api.get("/stock/rank");
      return response?.data?.data;
    };
  
    const {
      data: rows,
      isLoading,
      isError,
    } = useQuery("stockRank", fetchStockRank, {
      refetchInterval: 5000, // 5초마다 요청
    });
  
    if (isLoading || isError) {
      console.error("위치: TopStocks.tsx, 거래량 순위 불러오기 실패");
      return <CustomCircularProgress />;
    }
  
    // 랭킹 5위씩 끊어서 저장하기
    const rowTop5 = rows?.slice(0, 5);
    const rowTop10 = rows?.slice(5);

  return (
    <div className="h-full">
      {/* 좋아요 종목 캐러셀 */}
      <div className="h-1/5">
        <FavoriteItemsCarousel items={items} />
      </div>
      <div className="h-4/5 grid grid-cols-2 grid-rows-2 gap-x-6 place-items-stretch px-8 pt-6">
        {/* 거래량 순위 */}
        <Container>
          <Title>
            거래량 순위
          </Title>
          <Content>
            <table className="w-full h-full overflow-hidden">
              <tbody>
                {rowTop5?.map((row: rowType) => (
                  <StockRow
                    key={row.stockId}
                    row={row}
                    onClick={() => navigate(`/stock/${row.stockId}`)}
                  />
                ))}
              </tbody>
            </table>
          </Content>
        </Container>
        <Container>
          <Title>
          <span className="text-sm text-slate-600 ml-2">
              한국투자증권 기준
            </span>
          </Title>
          <Content>
            <table className="w-full h-full overflow-hidden">
              <tbody>
              {rowTop10?.map((row: rowType) => (
                <StockRow
                  key={row.stockId}
                  row={row}
                  onClick={() => navigate(`/stock/${row.stockId}`)}
                />
              ))}
              </tbody>
            </table>
          </Content>
        </Container>
        {/* 퀴즈 */}
        <Container>
          <Tooltip
            placement="top"
            title={
            <div className="p-2">https://www.freepik.com/free-vector/businessman-with-money_1076116.htm#page=3&query=money%20quiz&position=21&from_view=search&track=ais</div>
          }>
            <div className="text-lg font-bold mb-2">데일리 퀴즈</div>
          </Tooltip>
          <Content>
            <div className="w-full text-2xl maple text-[#2e3252] flex flex-col items-end justify-end rounded-xl h-full p-4 bg-cover bg-center bg-moneyquiz cursor-pointer" onClick={() => navigate("/quiz")}>
              <div>데일리 퀴즈 풀고</div>
              <div>시드머니 1만원 받기!</div>
            </div>
          </Content>
        </Container>
        {/* 전체랭킹 */}
        <Container>
          <Title>전체 랭킹</Title>
          <Content className="min-h-0 overflow-y-auto">
            <TotalRanking />
          </Content>
        </Container>
      </div>
    </div>
  );
};

export default Home;

interface Icontainer {
  children: ReactNode;
  className?: string;
}

const Container = (props: Icontainer) => {
  const { children } = props;
  return <div className="col-span-1 row-span-1 w-full h-full flex flex-col flex-1 overflow-hidden">{children}</div>;
};

const Title = (props: Icontainer) => {
  const { children, className } = props;
  const combinedClassName = "text-lg font-bold mb-2 " + (className || "");
  return <h2 className={combinedClassName}>{children}</h2>;
};

const Content = (props: Icontainer) => {
  const { children, className } = props;
  const combinedClassName = "flex-grow mb-4 " + (className || "");
  return <div className={combinedClassName}>{children}</div>;
};
