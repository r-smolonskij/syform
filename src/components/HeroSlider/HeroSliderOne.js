import Swiper from "react-id-swiper";
import Link from "next/link";
import { Container } from "react-bootstrap";

const HeroSliderOne = ({ sliderData }) => {
  const params = {
    loop: true,
    speed: 1000,
    spaceBetween: 200,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav"></button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav"></button>
    )
  };
  return (
    <div className="hero-slider-one">
      <div className="hero-slider-one__wrapper">
        <Swiper {...params}>
          {sliderData &&
            sliderData.map((image, index) => {
              return (
                <div
                  className="hero-slider-one__slide swiper-slide"
                  key={index}
                >
                  <div className="slider-image">
                    <img
                      src={image}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderOne;
