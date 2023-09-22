import Carousel from "../../common/carousel/Carousel";

import Button from "@mui/joy/Button";

interface IfavoriteItemsCarousel {
  items: React.ReactNode[];
}

/** 관심 종목 캐러셀 */
const FavoriteItemsCarousel: React.FC<IfavoriteItemsCarousel> = ({ items }) => {
  if (!items.length) {
    return (
      <div className="h-full px-6 py-4 bg-slate-200 rounded-t-lg">
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <p className="text-gray-500">현재 목록에 관심종목이 없습니다.</p>
          <p className="text-gray-500">종목을 추가해보세요.</p>
          <Button size="sm" variant="solid" color="danger">
            종목 추가
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex px-6 py-4 items-center bg-slate-200 rounded-t-lg">
      <div className="h-full flex grow flex-1 overflow-hidden">
        <Carousel items={items} />
      </div>
    </div>
  );
};

export default FavoriteItemsCarousel;
