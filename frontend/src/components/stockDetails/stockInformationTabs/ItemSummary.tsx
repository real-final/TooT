import { useState } from "react";
import { ItemOverviewHeader } from "./StockInformationTabs";
import { IstockItem } from "../../../interface/IstockDetails";

/** 상세조회 페이지 종목요약 */
const ItemSummary: React.FC<{ stockId?: string; stockItem?: IstockItem }> = ({
  stockId,
  stockItem,
}) => {
  if (typeof stockId === "undefined" || typeof stockItem === "undefined")
    return <></>;

  return (
    <div className="mb-3">
      {/* 종목 타이틀(로고,이름,코드) */}
      <div className="h-3/12">
        <ItemOverviewHeader stockId={stockId} stockItem={stockItem} />
      </div>
      {/* 간단정보 */}
      <div className="h-5/12">
        <ItemData data={stockItem} />
      </div>
      {/* 기업개요 */}
      <div className="h-4/12">
        <ItemOutline outline={stockItem?.outline} />
      </div>
    </div>
  );
};

export default ItemSummary;

/** 간단 정보 컴포넌트 */
const ItemData: React.FC<{ data: IstockItem }> = ({ data }) => {
  return (
    <div className="mb-3">
      <div className="grid grid-rows-3 grid-cols-2 gap-3 mb-3">
        <ItemDataElement title="시가총액" element={data.totalPrice} />
        <ItemDataElement
          title="주식수"
          element={data.totalStock.toLocaleString() + "주"}
        />
        <ItemDataElement title="산업군" element={data.industryClass} />
        <ItemDataElement title="세부산업군" element={data.wics} />
        <ItemDataElement
          title="52주 최저"
          element={data.min52.toLocaleString()}
        />
        <ItemDataElement
          title="52주 최고"
          element={data.max52.toLocaleString()}
        />
      </div>
      <hr />
    </div>
  );
};

/** 간단 정보 요소 */
const ItemDataElement: React.FC<{
  title: string;
  element: string | number | null;
}> = ({ title, element }) => {
  let displayValue = element;
  // 글자 색 설정
  let textColor =
    title === "52주 최저"
      ? "text-blue-600"
      : title === "52주 최고"
      ? "text-red-600"
      : "text-black";

  // 시가총액 조 단위 설정
  if (title === "시가총액") {
    const value = parseInt(element as string);
    const 조단위 = Math.floor(value / 10000);
    const 억단위 = value % 10000;

    if (조단위 > 0) {
      displayValue = `${조단위}조 ${억단위.toLocaleString()}억`;
    } else if (억단위 > 1000) {
      displayValue = `${억단위.toLocaleString()}억`;
    } else {
      displayValue = `${억단위}억`;
    }
  }

  return (
    <div>
      <h3 className="text-xs text-neutral-500">{title}</h3>
      <p className={"text-sm " + textColor}>{displayValue}</p>
    </div>
  );
};

/** 기업 개요 컴포넌트 */
const ItemOutline: React.FC<{
  outline: string;
}> = ({ outline: overview }) => {
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