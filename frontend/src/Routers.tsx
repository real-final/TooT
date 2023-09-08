import { Route, Routes } from "react-router-dom";
import Example from "./components/main/Example";
import Home from "./components/main/Home";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/stock" element={<Example />}></Route>
      <Route path="/user" element={<Example />}></Route>
      <Route path="/rank" element={<Example />}></Route>
      <Route path="/quiz" element={<Example />}></Route>
    </Routes>
  );
};

export default Routers;
