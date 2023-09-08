import testData from "../rankingTestData";
import MiniRankingItem from "./miniRankingItem";

const MiniRanking = () => {
  return(
    <div className="w-full h-full flex flex-col no-scrollbar overflow-y-auto">
      {testData.map((data, index) => (
        <MiniRankingItem user={data} index={index} key={index} />
      ))}
    </div>
  );
};

export default MiniRanking;