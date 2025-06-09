import React from 'react';

type HorizontalCarouselProps = {
  images: string[];
};

const Carousel: React.FC<HorizontalCarouselProps> = ({ images }) => {
  return (
    <div className="horizontal-carousel">
      <div className="carousel-track">
        {images?.map((imgSrc, index) => (
          <div key={index} className="carousel-item">
            <img src={imgSrc} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
