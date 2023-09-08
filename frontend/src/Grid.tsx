import ChatContainer from "./components/container/ChatContainer";
import MainContainer from "./components/container/MainContainer";
import UserContainer from "./components/container/UserContainer";

const Grid = () => {
  return (
    <div className="h-full grid grid-cols-4 gap-[24px] p-[24px] grid-rows-3">
      <MainContainer />
      <UserContainer />
      <ChatContainer />
    </div>
  );
};

export default Grid;