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

const UserStockDetail = () => {
  const stockId = useSearchParams("stockId");
  const userAuthContext = useContext(UserAuthContext);
  const accessToken = userAuthContext?.accessToken;

  const [userDetailTotal, setUserDetailTotal] = useState<IuserStock | undefined>();
  const [userDetailTrade, setUserDetailTrade] = useState([]);

  const { isLoading: isTotalLoading } = useQuery("user-stock-detail-trade", async () => {
    const response = await api.get(`/my/${stockId}`, {
      headers: {
        accesstoken: accessToken,
      },
    });
    setUserDetailTotal(response.data.data);
    console.log("상세 유저 주식 api");
    console.log(response);
  });

  const { isLoading: isTradeLoading } = useQuery("user-stock-detail-trade", async () => {
    const response = await api.get(`/stock/execution/${stockId}`, {
      headers: {
        accesstoken: accessToken,
      },
    });
    setUserDetailTrade(response.data.data);
    console.log("상세 유저 주식 거래 api");
    console.log(response);
  });

  return(
    <div className="w-full h-full p-8 min-h-0">
      <Title title={`보유 주식 - ${userDetailTotal?.stockName}`} />
      { isTotalLoading ? <CustomCircularProgress /> : <UserStockDetailTotal stock={userDetailTotal} />}
      { isTradeLoading ? <CustomCircularProgress /> : <div className="h-[60%] no-scrollbar overflow-y-auto">
        {userDetailTrade?.map((item, index) => (
          <UserStockTrade index={index} trade={item} />
        ))}
      </div>}
    </div>
  );
};
export default UserStockDetail;