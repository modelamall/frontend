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
          <img src="https://www.apple.com/v/macbook-pro-14-and-16/e/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_medium_2x.jpg" className="embla__slide"/>
          <img src="https://images.hepsiburada.net/banners/s/0/960-352/banner_20230209135127.jpeg/format:webp" className="embla__slide"/>
          <img src="https://www.apple.com/v/macbook-pro-14-and-16/e/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_medium_2x.jpg" className="embla__slide"/>

        </div>
      </div>
    </>
  );
};

export default HeroSection;
