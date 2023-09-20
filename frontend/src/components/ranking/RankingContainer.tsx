import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import Ranking from "./Ranking";
import testData from "../../test/data/rankingTestData";
import UserRanking from "./UserRanking";
import Title from "../../common/etc/Title";
const RankingContainer = ({ title } : {size: string, title:string}) => {
  return (
    <div className="w-full h-full p-8 min-h-0">
      <div className="flex">
        <Title title={title} />
        <FontAwesomeIcon className="ml-2.5 text-first text-[24px]" icon={faTrophy} />
      </div>
      <div className="w-full flex justify-center mt-2.5 mb-8">
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