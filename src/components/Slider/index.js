import React from "react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
SwiperCore.use([Pagination]);
const Slider = (props) => {
  const { images = [1, 2, 3, 4, 5, 6] } = props;
  return (
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true
      }}
      className="mySwiper"
    >
      {images.map((image) => {
        return (
          <SwiperSlide>
            <p>{image}</p>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
