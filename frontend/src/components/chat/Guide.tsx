import { useDraggable } from "react-use-draggable-scroll";
import { useRef } from "react";
import { moveUrlTo } from "../../utils/chat/guideButtonUtils";
import GuideButton from "./GuideButton";

import {faAddressBook, faClipboardQuestion, faHouseChimneyCrack, faMagnifyingGlassChart, faTrophy, faUser, faUserFriends} from "@fortawesome/free-solid-svg-icons";

const Guide = () => {
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const userId = userInfo ? userInfo.id : null;

  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const {events} = useDraggable(ref);

  return (
    <div className="mb-2 mt-1 w-full flex whitespace-nowrap overflow-x-scroll no-scrollbar cursor-grab" {...events} ref={ref}>
      <GuideButton buttonName="전체 주식" isIcon={true} icon={faMagnifyingGlassChart} iconColor="text-stockRed" url="/" moveUrlTo={moveUrlTo} />
      <GuideButton buttonName="내 주식" url={`/${userId}/stock`}  isIcon={true} icon={faUser} iconColor="text-stockBlue" moveUrlTo={moveUrlTo} />
      <GuideButton buttonName="전체 랭킹" isIcon={true} icon={faTrophy} iconColor="text-first" url="/ranking/total" moveUrlTo={moveUrlTo} />
      <GuideButton buttonName="친구 랭킹" isIcon={true} icon={faUserFriends} iconColor="text-[#FF9A9A]" url="/ranking/friend" moveUrlTo={moveUrlTo} />
      <GuideButton buttonName="데일리 퀴즈" isIcon={true} icon={faClipboardQuestion} iconColor="text-[#1EC492]" url="/quiz" moveUrlTo={moveUrlTo} />
      <GuideButton buttonName="내 거래" url={`/${userId}/trade`} isIcon={true} icon={faAddressBook} iconColor="text-[#c242f5]" moveUrlTo={moveUrlTo} />
      <GuideButton buttonName="내 파산" url={`/${userId}/bankrupt`} isIcon={true} icon={faHouseChimneyCrack} iconColor="text-black" moveUrlTo={moveUrlTo} />
    </div>
  );
};

export default Guide;
