import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Provider } from "react-redux";
import store from "./store";
import Grid from "./Grid";
import Nav from "./common/nav/Nav";
import CustomCircularProgress from "./common/circularProgress/CustomCircularProgress";
import { fetchUserAuthData } from "./utils/fetchUserAuthData";
import { IuserAuthContext } from "./interface/IauthUserContext";
import { HelmetProvider } from "react-helmet-async";

/** 유저정보 & 토큰관리용 ContextAPI */
export const UserAuthContext = createContext<IuserAuthContext | undefined>(
  undefined
);

function App() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if(window.innerWidth < 768 || window.innerWidth <= window.innerHeight){
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 유저정보 & Access 토큰 요청하기
  const { data: contextData, isLoading } = useQuery(
    "userAuthData",
    fetchUserAuthData,
    {
      refetchOnWindowFocus: false, // 다른 탭에서 다시 페이지 접근 시 refetch 취소
      retry: 0, // 오류로 인한 refetch 횟수 제한
    }
  );

  return (
    <HelmetProvider>
      <Provider store={store}>
        <UserAuthContext.Provider value={contextData}>
          { !isMobile ? <div className="App w-screen max-h-screen h-screen flex flex-col bg-background">
            <Nav />
            {isLoading ? <CustomCircularProgress /> : <Grid />}
          </div> : null}
          {isMobile ? <div className="w-screen h-screen flex items-center justify-center">
            <span>PC 화면으로 접속해주세요!</span>
          </div> : null}
        </UserAuthContext.Provider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
