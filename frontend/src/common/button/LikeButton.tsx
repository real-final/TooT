import { useState, useContext } from "react";
import { UserAuthContext } from "../../App";
import { api } from "../../utils/api";

import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

interface IlikeButton {
  stockId: string;
  isFavorite: boolean;
  size: "small" | "medium";
}

/** 좋아요 버튼 컴포넌트 */
const LikeButton: React.FC<IlikeButton> = ({ stockId, isFavorite, size }) => {
  // Access토큰 가져오기
  const userAuthContext = useContext(UserAuthContext);
  const accessToken = userAuthContext?.accessToken as string;

  // 최초 좋아요 상태(true || false)
  const [isLiked, setIsLiked] = useState(isFavorite);

  // 좋아요 추가 요청
  const onLikeClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    await fetchSetFavorites("add", stockId, accessToken);
    setIsLiked(true);
  };

  // 좋아요 취소 요청
  const onUnlikeClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    await fetchSetFavorites("cancel", stockId, accessToken);
    setIsLiked(false);
  };

  const iconButtonSize = size === "medium" ? "32px" : "22px";

  return (
    <IconButton
      onClick={isLiked ? onUnlikeClick : onLikeClick}
      color="danger"
      variant="plain"
      sx={{
        "--IconButton-size": iconButtonSize,
      }}
    >
      {/* 좋아요 눌러진 버튼 */}
      <Favorite
        fontSize={size}
        className={`absolute transition-opacity duration-500 ${
          isLiked ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* 좋아요 안 눌러진 버튼 */}
      <FavoriteBorder
        fontSize={size}
        className={`absolute transition-opacity duration-500 ${
          isLiked ? "opacity-0" : "opacity-100"
        }`}
      />
    </IconButton>
  );
};

export default LikeButton;

/** 좋아요 API 요청 함수 */
const fetchSetFavorites = async (
  action: string,
  stockId: string,
  accessToken: string
) => {
  try {
    await api.patch(
      `/stock/interest/${action}/${stockId}`,
      {
        stockId: stockId, // TODO: 우현이한테 이거 제거하고 요청할 수 있도록 말해야함.
      },
      {
        headers: {
          accesstoken: accessToken,
        },
      }
    );
  } catch (error) {
    console.error("위치: LikeButton.tsx, 좋아요 요청 실패", error);
  }
};
