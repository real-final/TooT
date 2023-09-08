import { ReactNode } from "react";

const Home = () => {
  return (
    <div className="h-full p-6">
      <div className="h-1/5 border border-dotted border-red-600">
        <Container>
          <Title>관심 종목</Title>
          <Content>캐러셀</Content>
        </Container>
      </div>
      <div className="w-full h-2/5 flex border border-dotted border-red-600">
        <Container>
          <Title>거래량 순위</Title>
          <Content>세부내용</Content>
        </Container>
        <Container>
          <Title>코스피 200</Title>
          <Content>세부내용</Content>
        </Container>
      </div>
      <div className="h-2/5 flex border border-dotted border-red-600">
        <Container>
          <Title>퀴즈</Title>
          <Content>세부내용</Content>
        </Container>
        <Container>
          <Title>전체랭킹</Title>
          <Content>세부내용</Content>
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
  return <div className="flex flex-col flex-1">{children}</div>;
};

const Title = (props: BAaProps) => {
  const { children } = props;
  return <h2 className="text-base font-extrabold mb-2">{children}</h2>;
};

const Content = (props: BAaProps) => {
  const { children } = props;
  return <div className="p-4 bg-red-200 flex-grow">{children}</div>;
};

