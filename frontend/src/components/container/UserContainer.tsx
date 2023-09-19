import KakaoLogin from "./../user/KakaoLogin";
import Authentication from "../user/Authentication";
import UserInfomation from "../user/UserInfomation";
import { useIsSignedIn } from "../../hooks/useIsSignedIn";

const UserContainer = () => {
  return (
    <div className="col-span-1 row-span-1 drop-shadow-lg">
      <Authentication />
      {isSigned ? <UserInfomation /> : <KakaoLogin />}
    </div>
  );
};
};
export default UserContainer;
