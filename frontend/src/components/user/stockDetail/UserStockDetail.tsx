// import { useLocation, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Title from "../../../common/etc/Title";

import UserStockDetailTotal from "./UserStockDetailTotal";
import UserStockTrade from "../UserStockTrade";
import { useContext, useState } from "react";
import { UserAuthContext } from "../../../App";
import { api } from "../../../utils/api";
import { useQuery } from "react-query";
import CustomCircularProgress from "../../../common/circularProgress/CustomCircularProgress";
import { IuserStock } from "../../../interface/IuserStock";
import UserNoItem from "../UserNoItem";
import { IuserTrade } from "../../../interface/IuserTrade";

const UserStockDetail = () => {
  const stockId = useSearchParams("stockId");
  console.log("stockId:");
  console.log(stockId);
  const [userDetailTotal, setUserDetailTotal] = useState<IuserStock | undefined>();
  const [userDetailTrade, setUserDetailTrade] = useState<any>([]);

  const userAuthContext = useContext(UserAuthContext);
  const accessToken = userAuthContext?.accessToken;

  const { isLoading: isTotalLoading } = useQuery("user-stock-detail-trade", async () => {
    const response = await api.get(`/my/${stockId}`, {
      headers: {
        accesstoken: accessToken,
      },
    });
    setUserDetailTotal(response.data.data);
  });

  const { isLoading: isTradeLoading } = useQuery("user-stock-detail-trade", async () => {
    const response = await api.get(`/stock/execution/${stockId}`, {
      headers: {
        accesstoken: accessToken,
      },
    });
    setUserDetailTrade(response.data.data);
  });

  return(
    <div className="w-full h-full p-8 min-h-0">
      <Title title={`보유 주식 - ${userDetailTotal?.stockName}`} />
      { (isTotalLoading || isTradeLoading) ? 
      <CustomCircularProgress /> : 
      ((userDetailTotal && userDetailTrade) ? 
      <>
        <UserStockDetailTotal stock={userDetailTotal} />
        {userDetailTrade?.map((item:IuserTrade, index:number) => (
          <UserStockTrade key={index} index={index} trade={item} isName={true} />
        ))}
      </> : 
      <UserNoItem itemName="해당 보유 주식" />)}
    </div>
  );
};
export default UserStockDetail;
