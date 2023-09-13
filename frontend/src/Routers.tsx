import { Route, Routes } from "react-router-dom";
import Example from "./components/main/Example";
import Home from "./components/main/Home";
import RankingContainer from "./components/ranking/RankingContainer";
import UserStock from "./components/user/UserStock";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/stock" element={<Example />}></Route>
      <Route path="/user" element={<Example />}>
        <Route path="stock" element={<UserStock />}></Route>
      </Route>
      <Route path="/rank" element={<Example />}>
        <Route path="total" element={<RankingContainer size="big" title="전체 랭킹" />}></Route>
        <Route path="friend" element={<RankingContainer size="big" title="친구 랭킹" />}></Route>
      </Route>
      <Route path="/quiz" element={<Example />}></Route>
    </Routes>
  );
};

export default Routers;
