import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import Ranking from "./Ranking";

const RankingContainer = ({ title } : {size: string, title:string}) => {
  return(
    <div className="w-full h-full p-10 min-h-0">
      <div className="text-[36px]">{title} <FontAwesomeIcon className="text-first" icon={faTrophy} /></div>
      <br></br>
      <div className="w-[95%] h-[95%] h-min-0">
        <Ranking size="big" />
      </div>
    </div>
  );
};

export default RankingContainer;