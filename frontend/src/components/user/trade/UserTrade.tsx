import { useContext, useState } from "react";
import Title from "../../../common/etc/Title";
import UserStockTrade from "../UserStockTrade";
import { UserAuthContext } from "../../../App";
import { useQuery } from "react-query";
import { api } from "../../../utils/api";
import CustomCircularProgress from "../../../common/circularProgress/CustomCircularProgress";

const UserTrade = () => {
  const userAuthContext = useContext(UserAuthContext);
  const accessToken = userAuthContext?.accessToken;

  const [userTrade, setUserTrade] = useState([]);

  const { isLoading } = useQuery("user-trade", async () => {
    const response = await api.get("/stock/execution", {
      headers: {
        accesstoken: accessToken,
      },
    });
    setUserTrade(response.data.data);
  });

  return(
    <div className="w-full h-full p-8 min-h-0">
      <Title title="주식 거래 내역" />
      { isLoading ? <CustomCircularProgress /> : <div className="h-[90%] no-scrollbar overflow-y-auto">
        {userTrade.map((item, index) => (
          <UserStockTrade index={index} trade={item} isName={true} />
        ))}
      </div>}
    </div>
  );
};

export default UserTrade;