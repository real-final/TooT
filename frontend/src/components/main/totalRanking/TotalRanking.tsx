import { useContext } from "react";
import { useQuery } from "react-query";
import { api } from "../../../utils/api";
import { UserAuthContext } from "../../../App";

import TotalRankingItem from "./TotalRankingItem";
import CustomCircularProgress from "../../../common/circularProgress/CustomCircularProgress";

type ListType = {
  name: string;
  profileImage: string;
  netProfit: number;
  bankruptcyNo: number;
};

const TotalRanking: React.FC = () => {
  // TODO: Access토큰 없이 요청하도록 수정해야함
  const userAuthContext = useContext(UserAuthContext);
  const accessToken = userAuthContext?.accessToken;

  const { data, isLoading, isError } = useQuery("ranking-list", async () => {
    const response = await api.get("/rank/list", {
      headers: {
        accesstoken: accessToken,
      },
    });

    return response?.data?.data;
  });

  if (isLoading || isError) {
    return <CustomCircularProgress />;
  }

  let rankingList = data?.list;

  return (
    <table className="w-full h-full no-scrollbar">
      <tbody>
        {rankingList?.map((list: ListType, index: number) => (
          <TotalRankingItem user={list} index={index} key={index} />
        ))}
      </tbody>
    </table>
  );
};

export default TotalRanking;
