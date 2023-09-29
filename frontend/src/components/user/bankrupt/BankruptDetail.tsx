import Title from "../../../common/etc/Title";
import BankruptDetailTotal from "./BankruptDetailTotal";
import UserStockTrade from "../UserStockTrade";
import { useGetSearchParam } from "../../../hooks/useGetSearchParam";
import { useContext, useState } from "react";
import { UserAuthContext } from "../../../App";
import { useQuery } from "react-query";
import { api } from "../../../utils/api";
import CustomCircularProgress from "../../../common/circularProgress/CustomCircularProgress";
import { IuserBankrupt } from "../../../interface/IuserBankrupt";

const BankruptDetail = () => {
  const bankruptNo = useGetSearchParam("bankruptNo");
  const userAuthContext = useContext(UserAuthContext);
  const accessToken = userAuthContext?.accessToken;

  const [userBankruptTotal, setUserBankruptTotal] = useState<IuserBankrupt>();
  const [userBankruptTrade, setUserBankruptTrade] = useState([]);

  const { isLoading:isBankruptTotalLoading } = useQuery("user-bankrupt-detail-total", async () => {
    const response = await api.get(`/bankruptcy/${bankruptNo}`, {
      headers: {
        accesstoken: accessToken,
      },
    });
    setUserBankruptTotal(response.data.data);
  });

  const { isLoading:isBankruptTradeLoading } = useQuery("user-bankrupt-detail-trade", async () => {
    const response = await api.get(`/detail/${bankruptNo}`, {
      headers: {
        accesstoken: accessToken,
      },
    });
    setUserBankruptTrade(response.data.data);
  });

  return(
    <div className="w-full h-full p-8 min-h-0">
      <Title title={`${bankruptNo}회차 파산 기록`} />
      { isBankruptTotalLoading ? <CustomCircularProgress /> : <BankruptDetailTotal bankruptTotal={userBankruptTotal} />}
      { isBankruptTradeLoading ? <CustomCircularProgress /> : <div className="h-[70%] no-scrollbar overflow-y-auto">
      {userBankruptTrade.map((item, index) => (
          <UserStockTrade index={index} trade={item} isName={true} />
        ))}
      </div>}
    </div>
  );
};

export default BankruptDetail;