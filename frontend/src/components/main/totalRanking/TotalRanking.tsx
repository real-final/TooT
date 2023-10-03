import { useQuery } from "react-query";
import { api } from "../../../utils/api";

import TotalRankingItem from "./TotalRankingItem";
import CustomCircularProgress from "../../../common/circularProgress/CustomCircularProgress";

type ListType = {
  name: string;
  profileImage: string;
  netProfit: number;
  bankruptcyNo: number;
};

const TotalRanking: React.FC = () => {
  // 전체랭킹 가져오기
  const { data, isLoading, isError } = useQuery(
    "ranking-list",
    async () => {
      const response = await api.get("/rank/list");
      return response?.data?.data;
    },
    { retry: 0 }
  );

  if (isLoading || isError) {
    return <CustomCircularProgress />;
  }

  let rankingList = data?.list;

  return (
    <div className="w-full h-full h-min-0 overflow-y-auto no-scrollbar">
      <table className="w-full h-full border-separate border-spacing-2.5">
        <tbody>
          {rankingList?.map((list: ListType, index: number) => (
            <TotalRankingItem user={list} index={index} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalRanking;
