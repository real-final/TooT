import { ReactNode } from "react";
import TopStocks from "./TopStocks";
import Ranking from "../ranking/Ranking";
import FavoriteItemsCarousel from "./FavoriteItemsCarousel";

const Home: React.FC = () => {
  // let item = {
  //   id: "001230",
  //   name: "삼성전자",
  //   price: "100,000",
  //   difference: "200",
  //   percentage: "-0.80",
  // };
  // let items = Array(10).fill(<StockCard item={item} />);
  let items = Array(0);

  return (
    <div className="h-full">
      {/* 좋아요 종목 캐러셀 */}
      <div className="h-1/5">
        <FavoriteItemsCarousel items={items} />
      </div>
      <div className="h-2/5 flex px-6 pt-6">
        <Container className="pr-2">
          <Title>
            거래량 순위
            <span className="text-sm text-slate-600 ml-2">
              한국투자증권 기준
            </span>
          </Title>
          <Content className="pr-6">
            <TopStocks />
          </Content>
        </Container>
        <Container>
          <Title>코스피 200</Title>
          <Content>세부내용</Content>
        </Container>
      </div>
      <div className="h-2/5 flex px-6 pb-6">
        <Container>
          <Title>퀴즈</Title>
          <Content>세부내용</Content>
        </Container>
        <Container>
          <Title>전체랭킹</Title>
          <Content className="min-h-0">
            <Ranking size="small" />
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
  const { children } = props;
  return <h2 className="text-lg font-bold mb-4">{children}</h2>;
};

const Content = (props: Icontainer) => {
  const { children, className } = props;
  const combinedClassName = "flex-grow " + (className || "");
  return <div className={combinedClassName}>{children}</div>;
};
