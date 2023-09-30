import UserStockItem from "./UserStockItem";
import Title from "../../../common/etc/Title";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../../../App";
import { useQuery } from "react-query";
import { api } from "../../../utils/api";
import CustomCircularProgress from "../../../common/circularProgress/CustomCircularProgress";

const UserStock = () => {
  
  const [userStockList, setUserStockList] = useState([]);
  
  let accessToken:string | undefined;
  useEffect(() => {
    const userAuthContext = useContext(UserAuthContext);
    accessToken = userAuthContext?.accessToken;
  }, []);

  const { isLoading, isError } = useQuery("user-stock", async () => {
    const response = await api.get("/stock/my", {
      headers: {
        accesstoken: accessToken,
      },
    });
    setUserStockList(response.data.data);
  });

  if (isLoading || isError) {
    return <CustomCircularProgress />;
  }

  return (
    <div className="w-full h-full p-8 min-h-0">
      <Title title="보유 주식" />
      <div className="h-[90%] no-scrollbar overflow-y-auto">
        {userStockList?.map((item, index) => (
          <UserStockItem key={index} stock={item} />
        ))}
      </div>
    </div>
  );
};
export default UserStock;
