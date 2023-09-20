import { Route, Routes } from "react-router-dom";
import Home from "./components/main/Home";
import NotFound from "./common/notfound/NotFound";
import Example from "./components/main/Example";
import RankingContainer from "./components/ranking/RankingContainer";
import StockDetails from "./components/stockDetails/StockDetails";
import UserStock from "./components/user/stock/UserStock";
import UserStockDetail from "./components/user/stockDetail/UserStockDetail";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/stock/:stockId" element={<StockDetails />}></Route>
      <Route path="/user" element={<Example />}>
        <Route path="stock" element={<UserStock />}></Route>
        <Route path="stock/:stockId" element={<UserStockDetail />}></Route>
      </Route>
      <Route path="/rank" element={<Example />}>
        <Route
          path="total"
          element={<RankingContainer size="big" title="전체 랭킹" />}
        ></Route>
        <Route
          path="friend"
          element={<RankingContainer size="big" title="친구 랭킹" />}
        ></Route>
      </Route>
      <Route path="/quiz" element={<Example />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default Routers;
