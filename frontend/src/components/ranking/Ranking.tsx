import RankingItem from "./RankingItem";
import testData from "./rankingTestData";

const Ranking = ({size}:{size:string}) => {
  return (
    <div className="w-full h-full min-h-0 no-scrollbar overflow-y-auto">
      <table className="w-full h-full min-h-0 table-auto border-separate border-spacing-2">
        <tbody className="w-full h-full min-h-0">
          {testData.map((data, index) => (
            <RankingItem size={size} user={data} index={index} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Ranking;