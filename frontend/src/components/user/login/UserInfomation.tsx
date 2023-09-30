import { useContext } from "react";
import { UserAuthContext } from "../../../App";
import { IuserInfo } from "../../../interface/IauthUserContext";

import Avatar from "@mui/joy/Avatar";
import { useGetSearchParam } from "../../../hooks/useGetSearchParam";
import { sendKakaoFriendsCode } from "../../../utils/sendKakaoFriendsCode";

const UserInfomation: React.FC = () => {
  const userAuthContext = useContext(UserAuthContext);
  const userInfo = userAuthContext?.userInfo as IuserInfo;
  const accessToken = userAuthContext?.accessToken as string;
  
  // 1. 카카오 인증코드 읽기
  const code = useGetSearchParam("code");
  // 2. 서버로 카카오 친구목록 Auth코드 전송
  if (code?.length) {
    sendKakaoFriendsCode(code, accessToken);
  }

  return (
    <div className="h-full overflow-hidden">
      <div className="h-1/3 w-full rounded-t-lg bg-point flex justify-center items-center">
        <Avatar
          alt="프로필사진"
          src={userInfo.profileImage}
          size="lg"
          sx={{ mr: 2 }}
        />
        <p className="text-2xl font-semibold">{userInfo.name}님</p>
      </div>
      <div className="h-2/3 w-full rounded-b-lg bg-white px-10 py-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between mb-1">
            <p className="text-slate-500">평가금액</p>
            <p>
              <span className="text-black text-lg">
                {userInfo.cash.toLocaleString()}
              </span>
              <span>원</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-500">시드머니</p>
            <p>
              <span className="text-black text-lg">
                {userInfo.seedMoney.toLocaleString()}
              </span>
              <span>원</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-lg font-semibold text-slate-500">총자산</p>
          <p className="text-2xl font-regualr">
            <span className="text-black">
              {(userInfo.seedMoney + userInfo.cash).toLocaleString()}
            </span>
            <span>원</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfomation;