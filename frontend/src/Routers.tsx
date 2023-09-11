import { Route, Routes } from "react-router-dom";
import Home from "./components/main/Home";
import NotFound from "./common/notfound/NotFound"
import Example from "./components/main/Example";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stock" element={<Example />} />
      <Route path="/user" element={<Example />} />
      <Route path="/rank" element={<Example />} />
      <Route path="/quiz" element={<Example />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
