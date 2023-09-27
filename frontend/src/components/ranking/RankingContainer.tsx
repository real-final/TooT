/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserAuthContext } from "../../App";
import { REACT_APP_SERVER, REDIRECT_URI } from "../../utils/api";
import axios from "axios";

import Ranking from "./Ranking";
import UserRanking from "./UserRanking";
import Title from "../../common/etc/Title";
import CustomCircularProgress from "../../common/circularProgress/CustomCircularProgress";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const RankingContainer = ({ title }: { size: string; title: string }) => {
  const [friendAPI, setFriendAPI] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [myInfo, setMyInfo] = useState({
    name: "",
    profileImage: "",
    favorite: false,
    bankruptcyNo: 0,
    netProfit: 0,
  });
  const [fetchData, setFetchData] = useState(false);
  const userAuthContext = useContext(UserAuthContext);
  const accessToken = userAuthContext?.accessToken;

  useEffect(() => {
    if (title === "친구 랭킹")
      setFriendAPI(`${REACT_APP_SERVER}/rank/list/kakao`);
    else {
      setFriendAPI(`${REACT_APP_SERVER}/rank/list`);
    }
    setFetchData(true);
  }, []);

  const { isLoading } = useQuery<any>(
    "friend-list",
    async () => {
      const response = await axios.get(friendAPI, {
        headers: {
          accesstoken: accessToken,
        },
      });

      const responseData = response?.data;
      console.log(responseData);

      if (responseData.success === false) {
        const CLIENT_ID = "d1fc52f81b5a4dd2f6ae29b5fb7d6932";
        const kakaoFriendsUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=friends`;
        return (window.location.href = kakaoFriendsUrl);
      }
      setFriendList(responseData?.data?.list);
      setMyInfo(responseData?.data?.myInfo);
    },
    {
      enabled: fetchData,
    }
  );

  if (isLoading) {
    return <CustomCircularProgress />;
  }

  return (
    <div className="w-full h-full p-8 min-h-0">
      <div className="flex">
        <Title title={title} />
        <FontAwesomeIcon
          className="ml-2.5 text-first text-[24px]"
          icon={faTrophy}
        />
      </div>
      <div className="w-full flex justify-center mt-2.5 mb-8">
        <UserRanking index={0} user={myInfo} />
      </div>
      <hr />
      <div className="w-[95%] h-[70%] h-min-0">
        <Ranking size="big" friendList={friendList} />
      </div>
    </div>
  );
};

export default RankingContainer;
