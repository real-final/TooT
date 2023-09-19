import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

interface ICarouselProps {
  items: React.ReactNode[];
}

const Carousel: React.FC<ICarouselProps> = ({ items }) => {
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

export default Carousel;
