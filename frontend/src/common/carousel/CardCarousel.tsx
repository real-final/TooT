import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

interface CardCarouselProps {
  items: React.ReactNode[];
}

const CardCarousel = ({ items }: CardCarouselProps) => {
  return (
    <AliceCarousel
      autoWidth
      mouseTracking
      disableDotsControls
      disableButtonsControls
      items={items}
    />
  );
};

export default CardCarousel;
