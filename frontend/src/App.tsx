import { useEffect, createContext, useState } from "react";
import api from "./utils/api";
import Grid from "./Grid";
import Nav from "./common/nav/Nav";

type TokenContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

/** Access토큰 관리용 변수 */
export const TokenContext = createContext<TokenContextType | undefined>(
  undefined
);

function App() {
  let [token, setToken] = useState<string | null>(null);

  const requestToken = async () => {
    try {
      let response = await api.get(`/${"토큰발급url"}`);
      if (response?.data?.token) {
        setToken(response.data.token);
      }
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    requestToken();
  }, []);

  return (
    <div className="App w-screen max-h-screen h-screen flex flex-col bg-background">
      <Nav />
      <TokenContext.Provider value={{ token, setToken }}>
        <Grid />
      </TokenContext.Provider>
    </div>
  );
}

export default App;
