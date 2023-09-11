import { ReactNode } from "react";
import StockCard from "../../common/card/StockCard";
import Carousel from "../../common/carousel/Carousel";
import MiniRanking from "../ranking/mini/miniRanking";

const Home = () => {
  let items = Array(10).fill(<StockCard />);

  return (
    <div className="h-full">
      <div className="h-1/5 flex p-6 items-start bg-slate-200 rounded-t-lg">
        <Container>
          {/* <Title>관심 종목</Title> */}
          <Content className="flex">
            <Carousel items={items} />
          </Content>
        </Container>
      </div>
      <div className="h-2/5 flex px-6 pt-6">
        <Container className="pr-2">
          <Title>거래량 순위</Title>
          <Content>세부내용</Content>
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
            <MiniRanking />
          </Content>
        </Container>
      </div>
    </div>
  );
};

export default Home;

interface BAaProps {
  children: ReactNode;
  className?: string;
}

const Container = (props: BAaProps) => {
  const { children } = props;
  return <div className="flex flex-col flex-1 overflow-hidden">{children}</div>;
};

const Title = (props: BAaProps) => {
  const { children } = props;
  return <h2 className="text-base font-extrabold mb-2">{children}</h2>;
};

const Content = (props: BAaProps) => {
  const { children, className } = props;
  const combinedClassName = "flex-grow " + (className || "");
  return <div className={combinedClassName}>{children}</div>;
};
