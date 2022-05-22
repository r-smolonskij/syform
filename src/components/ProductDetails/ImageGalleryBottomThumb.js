import { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdExpand,
  IoIosHeartEmpty
} from "react-icons/io";
import { Tooltip } from "react-tippy";

const ImageGalleryBottomThumb = ({
  product,
  wishlistItem,
  addToast,
  addToWishlist,
  deleteFromWishlist
}) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <IoIosArrowBack />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <IoIosArrowForward />
      </button>
    )
  };
  return (
    <Fragment>
      <div className="product-large-image-wrapper space-mb--30">
        {/* floating badges */}

        {/* wishlist button */}
        <div className="product-details-button-wrapper">
        </div>
        <LightgalleryProvider>
          <LightgalleryItem
            group="any"
            src={product.image.file.url}
          />
          {/* <Swiper {...gallerySwiperParams}>
            {product.image &&
              product.image.map((image, i) => {
                return (
                  <div key={i}>
                    <LightgalleryItem
                      group="any"
                      src={process.env.PUBLIC_URL + image}
                    >
                      <Tooltip
                        title="Click to enlarge"
                        position="left"
                        trigger="mouseenter"
                        animation="shift"
                        arrow={true}
                        duration={200}
                      >
                        <button className="enlarge-icon">
                          <IoMdExpand />
                        </button>
                      </Tooltip>
                    </LightgalleryItem>
                    <div className="single-image">
                      <img
                        src={process.env.PUBLIC_URL + image}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
          </Swiper> */}
        </LightgalleryProvider>
      </div>
      <div className="product-small-image-wrapper">
        <Swiper {...thumbnailSwiperParams}>
          {product.image &&
            product.image.map((image, i) => {
              return (
                <div key={i}>
                  <div className="single-image">
                    <img
                      src={process.env.PUBLIC_URL + image}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
        </Swiper>
      </div>
    </Fragment>
  );
};

export default ImageGalleryBottomThumb;
