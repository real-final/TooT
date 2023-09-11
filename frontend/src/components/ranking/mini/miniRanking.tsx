import testData from "../rankingTestData";
import MiniRankingItem from "./miniRankingItem";

const MiniRanking = () => {
  return (
    <div className="w-full h-full no-scrollbar overflow-y-auto">
      <table className="w-full h-full table-auto border-separate border-spacing-2">
        <tbody className="w-full h-full">
          {testData.map((data, index) => (
            <MiniRankingItem user={data} index={index} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MiniRanking;