import Title from "../../../common/etc/Title";
import { bankruptTestData } from "../../../test/data/bankruptTestData";
import BankruptItem from "./BankruptItem";

const Bankrupt = () => {
  return (
    <div className="w-full h-full p-8 min-h-0">
      <Title title="파산 기록" />
      <div className="h-[90%] no-scrollbar overflow-y-auto">
        {/* TODO: 파산 기록 조회 데이터 BE 연동하기 */}
        {bankruptTestData.map((item) => (
          <BankruptItem key={item.index} bankrupt={item} />
        ))}
      </div>
    </div>
  );
};

export default Bankrupt;