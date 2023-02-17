import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import "./style.css";


const HeroSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])


  return (
    <>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <img src="https://images.hepsiburada.net/banners/s/0/960-352/banner_20230130132141.jpeg/format:webp" className="embla__slide"/>
          <img src="https://images.hepsiburada.net/banners/s/0/960-352/banner_20230210130250.jpeg/format:webp" className="embla__slide"/>
          <img src="https://images.hepsiburada.net/banners/s/0/960-352/banner_20230213112347.jpeg/format:webp" className="embla__slide"/>

        </div>
      </div>
    </>
  );
};

export default HeroSection;
