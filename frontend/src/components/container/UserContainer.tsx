import KakaoLogin from "./../user/login/KakaoLogin";
import UserInfomation from "../user/login/UserInfomation";
import { useIsSignedIn } from "../../hooks/useIsSignedIn";

const UserContainer = () => {
  let isSigned = useIsSignedIn();
  return (
    <div className="col-span-1 row-span-1 drop-shadow-lg">
      {isSigned ? <UserInfomation /> : <KakaoLogin />}
    </div>
  );
};

export default UserContainer;
