import { ReactNode } from "react";
import StockCard from "../../common/card/StockCard";
import Carousel from "../../common/carousel/Carousel";
import Ranking from "../ranking/Ranking";

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
          <div className="text-[20px] mb-4 font-bold">거래량 순위</div>
          <Content>세부내용</Content>
        </Container>
        <Container>
          <div className="text-[20px] mb-4 font-bold">코스피 200</div>
          <Content>세부내용</Content>
        </Container>
      </div>
      <div className="h-2/5 flex px-6 pb-6">
        <Container>
          <div className="text-[20px] mb-4 font-bold">퀴즈</div>
          <Content>세부내용</Content>
        </Container>
        <Container>
          <div className="text-[20px] mb-4 font-bold">전체랭킹</div>
          <Content className="min-h-0">
            <Ranking size="small" />
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
