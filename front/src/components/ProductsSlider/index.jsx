import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItem from "../ProductItems";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules

import {  Navigation } from 'swiper/modules';
const ProductSlider = (props) => {
  return (
    <div className="productsSlider py-3">
        <Swiper
              spaceBetween={10}
             slidesPerView={props.items}
              navigation={true}
              modules={[Navigation]}
              className="sliderHome"
            >
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductItem/>
              </SwiperSlide>
         </Swiper>
    </div>
  );
};

export default ProductSlider;