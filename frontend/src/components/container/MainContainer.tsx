import Routers from "../../Routers";
import ParamsCodeReader from "../../ParamsCodeReader";

const MainContainer = () => {
  return (
    <div className="col-span-3 row-span-3 bg-white rounded-lg drop-shadow-md">
      <Routers />
      <ParamsCodeReader />
    </div>
  );
};

export default MainContainer;
