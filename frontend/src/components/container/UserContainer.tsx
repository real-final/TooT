import KakaoLogin from "./../user/KakaoLogin";
import Authentication from "../user/Authentication";
import React, { useContext } from "react";
import { TokenContext } from "../../App";

const UserContainer = () => {
  const tokenContext = useContext(TokenContext);
  const token = tokenContext?.token;

  return (
    <div className="col-span-1 row-span-1 drop-shadow-lg">
      <Authentication />
      {token ? <></> : <KakaoLogin />}
    </div>
  );
};
export default UserContainer;
