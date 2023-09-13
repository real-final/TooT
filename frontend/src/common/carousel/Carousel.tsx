import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

interface CarouselProps {
  items: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
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
