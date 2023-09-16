import { useEffect, createContext, useState } from "react";
import { requestToken } from "./utils/requestToken";

import Grid from "./Grid";
import Nav from "./common/nav/Nav";

type TokenContextType = {
  accessToken?: string; 
};

/** Access토큰 관리용 변수 */
export const TokenContext = createContext<TokenContextType | undefined>(
  undefined
);

function App() {
  let [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    /** Access 토큰 받아오기 */
    const getAccessToken = async () => {
      const token = await requestToken();
      setAccessToken(token);
    };

    getAccessToken();
  }, []);

  return (
    <TokenContext.Provider value={{accessToken}}>
      <div className="App w-screen max-h-screen h-screen flex flex-col bg-background">
        <Nav />
        <Grid />
      </div>
    </TokenContext.Provider>
  );
}

export default App;
