import { useState } from "react";
import { ItemOverviewHeader } from "./StockInformationTabs";

/** 상세조회 페이지 종목요약 */
const ItemSummary: React.FC = () => {
  const 기업개요: string =
    "삼성전자는 1969년 설립된 기업으로 반도체, 전자 제품 제조·판매업을 영위하고 있다. 주요 종속기업은 삼성전자로지텍, 삼성전자서비스, 삼성디스플레이, 스테코, 삼성메디슨 등이 있다.주요 매출은 스마트폰, 네트워크시스템, 컴퓨터 등을 생산하는 IM부문에서 발생하고 있으며 반도체, CE 부문이 뒤를 잇고 있다.TV, 스마트폰, 반도체 및 디스플레이 패널 부문 등에서 글로벌 우위의 경쟁력을 확보하고 있으며, 메타버스와 로보틱스 시장으로 진출하기 위해 M & A를 계획하고 있다.";

  return (
    <div>
      <div className="h-3/12">
        {/* 종목 타이틀(로고,이름,코드) */}
        <ItemOverviewHeader />
      </div>
      {/* 간단정보 */}
      <div className="h-5/12">간단 정보</div>
      {/* 기업개요 */}
      <div className="h-4/12">
        <CompanyOverview overview={기업개요} />
      </div>
    </div>
  );
};

export default ItemSummary;

interface IcompanyOverview {
  overview: string;
}

const CompanyOverview: React.FC<IcompanyOverview> = ({ overview }) => {
  const [showMore, setShowMore] = useState(false);

  // 내용을 문장으로 분할
  const sentences = overview
    .split(".")
    .filter((sentence) => sentence.trim() !== "");
  const firstSentence = sentences[0];

  return (
    <div>
      <h2 className="text-md font-bold mb-2">기업개요</h2>
      <p className="text-sm mb-2">{firstSentence}.</p>
      {showMore &&
        sentences.map((sentence, index) => (
          <p key={index} className="text-sm mb-2">
            {sentence}.
          </p>
        ))}
      <button onClick={() => setShowMore(!showMore)}>
        <p className="text-sm text-gray-600">
          {showMore ? "숨기기" : "더보기"}
        </p>
      </button>
    </div>
  );
};
