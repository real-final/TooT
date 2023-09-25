import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import Ranking from "./Ranking";
import testData from "../../test/data/rankingTestData";
import UserRanking from "./UserRanking";
import Title from "../../common/etc/Title";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import FriendAuth from "../user/FriendAuth";
const RankingContainer = ({ title } : {size: string, title:string}) => {
  const [friendAPI, setFriendAPI] = useState("");
  const [friendList, setFriendList] = useState([]);
  const {isFetching, isError} = useQuery<any>("friend-list", async () => {
    await axios.get(friendAPI).then(({data}) => {
      console.log(data);
      // setFriendList(data);
    });
  });

  useEffect(() => {
    if(title === "친구 랭킹")
      setFriendAPI("http://localhost:8080/rank/list/kakao?id=36");
    else
      setFriendAPI("http://localhost:8080/rank/list/");
  }, []);

  useEffect(() => {
    if(isError === true){
      window.location.href = "https://kauth.kakao.com/oauth/authorize?client_id=d1fc52f81b5a4dd2f6ae29b5fb7d6932&redirect_uri=http://localhost:3000&response_type=code&scope=friends";
    }
  }, [isError])


  return (
    <div className="w-full h-full p-8 min-h-0">
      <div className="flex">
        <Title title={title} />
        <FontAwesomeIcon className="ml-2.5 text-first text-[24px]" icon={faTrophy} />
      </div>
      <div className="w-full flex justify-center mt-2.5 mb-8">
        <UserRanking index={0} user={testData[0]} />
      </div>
      <hr />
      <div className="w-[95%] h-[70%] h-min-0">
        {isFetching ? <div>로딩 중</div> : <Ranking size="big" friendList={friendList} />}
      </div>
      {/* <FriendAuth /> */}
    </div>
  );
};

export default RankingContainer;