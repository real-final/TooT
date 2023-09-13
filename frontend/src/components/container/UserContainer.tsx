import { useContext } from "react";
import { TokenContext } from "../../App";
import KakaoLogin from "./../user/KakaoLogin";
import Authentication from "../user/Authentication";
import UserInfomation from "../user/UserInfomation";

const UserContainer = () => {
  const tokenContext = useContext(TokenContext);
  const token = tokenContext?.token;

  return (
    <div className="col-span-1 row-span-1 drop-shadow-lg">
      <Authentication />
      {token ? <UserInfomation /> : <KakaoLogin />}
    </div>
  );
};
export default UserContainer;
