import { createContext } from "react";
import { useQuery } from "react-query";
// import { useGetSearchParam } from "./hooks/useGetSearchParam";
import { fetchUserAuthData } from "./utils/fetchUserAuthData";

import Grid from "./Grid";
import Nav from "./common/nav/Nav";
import CustomCircularProgress from "./common/circularProgress/CustomCircularProgress";

import { IuserAuthContext } from "./interface/IauthUserContext";

function App() {
  // 브라우저 URL Parameter에서 Kakao 인증 코드 읽기
  // const code = useGetSearchParam("code");
  // 유저정보 & Access 토큰 요청하기
  const { data: contextData, isLoading } = useQuery(
    "userAuthData",
    fetchUserAuthData,
    { retry: 0 }
  );

  return (
    <UserAuthContext.Provider value={contextData}>
      <div className="App w-screen max-h-screen h-screen flex flex-col bg-background">
        <Nav />
        {isLoading ? <CustomCircularProgress /> : <Grid />}
      </div>
    </UserAuthContext.Provider>
  );
}

export default App;

/** 유저정보 & access토큰 관리용 ContextAPI */
export const UserAuthContext = createContext<IuserAuthContext | undefined>(
  undefined
);
