import { ReactNode } from "react";
import TopStocks from "./topTrandingStocks/TopStocks";
import FavoriteItemsCarousel from "./FavoriteItemsCarousel";
import TotalRanking from "./totalRanking/TotalRanking";

const Home: React.FC = () => {
  // TODO: 좋아요 목록 가져오기
  let items = Array(0);

  return (
    <div className="h-full">
      {/* 좋아요 종목 캐러셀 */}
      <div className="h-1/5">
        <FavoriteItemsCarousel items={items} />
      </div>
      <div className="h-2/5 flex px-8 pt-6">
        {/* 거래량 순위 */}
        <Container>
          <Title>
            거래량 순위
            <span className="text-sm text-slate-600 ml-2">
              한국투자증권 기준
            </span>
          </Title>
          <Content>
            <TopStocks />
          </Content>
        </Container>
      </div>
      <div className="h-2/5 flex px-8 pb-6">
        {/* 퀴즈 */}
        <Container>
          <Title>퀴즈</Title>
          <Content>세부내용</Content>
        </Container>
        {/* 전체랭킹 */}
        <Container>
          <Title>전체랭킹</Title>
          <Content className="min-h-0 overflow-y-auto no-scrollbar">
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
  return <div className="flex flex-col flex-1 overflow-hidden">{children}</div>;
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
