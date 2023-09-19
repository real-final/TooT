import { useEffect, createContext, useState } from "react";
import { requestAccessToken } from "./utils/requestAccessToken";
import { requestUserInfo } from "./utils/requestUserInfo";

import Grid from "./Grid";
import Nav from "./common/nav/Nav";

interface IUserAuthContext {
  accessToken?: string;
  userInfo?: object;
}

/** 유저정보 & access토큰 관리용 ContextAPI */
export const UserAuthContext = createContext<IUserAuthContext | undefined>(
  undefined
);

function App() {
  let [contextData, setContextData] = useState<IUserAuthContext>({});

  useEffect(() => {
    const fetchUserAuthData = async () => {
      // 1. Access토큰 요청
      const accessToken = await requestAccessToken();
      // 2. 사용자정보 요청
      if (typeof accessToken === "string") {
        const userInfo = await requestUserInfo(accessToken);
        // 3. Access토큰 & 사용자정보 저장
        if (userInfo && Object.keys(userInfo).length > 0) {
          setContextData({
            accessToken: accessToken,
            userInfo: userInfo,
          });
        } else {
          console.error("위치: App.tsx, userInfo 요청 실패");
        }
      } else {
        console.error("위치: App.tsx, access토큰 타입 에러");
      }
    };

    fetchUserAuthData();
  }, []);

  return (
    <UserAuthContext.Provider value={contextData}>
      <div className="App w-screen max-h-screen h-screen flex flex-col bg-background">
        <Nav />
        <Grid />
      </div>
    </UserAuthContext.Provider>
  );
}

export default App;
