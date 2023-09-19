import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import Ranking from "./Ranking";
import testData from "../../test/rankingTestData";
import UserRanking from "./UserRanking";
const RankingContainer = ({ title } : {size: string, title:string}) => {
  return (
    <div className="w-full h-full p-8 min-h-0">
      <div className="text-[36px] mb-8">
        {title} <FontAwesomeIcon className="text-first" icon={faTrophy} />
      </div>
      <div className="w-full flex justify-center mb-8">
        <UserRanking index={0} user={testData[0]} />
      </div>
      <hr />
      <div className="w-[95%] h-[70%] h-min-0">
        <Ranking size="big" />
      </div>
    </div>
  );
};

export default RankingContainer;