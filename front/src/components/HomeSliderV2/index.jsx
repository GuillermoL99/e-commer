import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from "@mui/material";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



// import required modules
import { EffectFade, Navigation, Autoplay,Pagination } from 'swiper/modules';

const HomeBannerV2 = () => {
  return (
        <Swiper
        loop={true}
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
        modules={[EffectFade, Navigation,Autoplay,Pagination]}
        className="homeSliderV2"
      >
        <SwiperSlide>
          <div className="item  rounded-md overflow-hidden relative">
            <img src="https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg" className="w-full" />
            <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] flex items-center flex-col justify-center transition-all ">
                <h4 className="h4info text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0 ">Big saving days Sale</h4>
                <h2 className="h2info text-[35px] font-[550] w-full relative -right-[100%] opacity-0" >Women Solid Round <br /> green t-shirt</h2>
                <h3 className="h3info text-[18px] font-[500] w-full text-left mt-3 mb-3 flex items-center gap-3 relative -right-[100%] opacity-0" >Starting At Only <span className="text-[#ff5252] text-[20px] ">$59.00</span></h3>

                <div className="butoninfo w-full relative -right-[100%] opacity-0">
                    <Button className="btn-org">Shop Now</Button>
                </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item  rounded-md overflow-hidden relative ">
            <img src="https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg" className="w-full" />
            <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] flex items-center flex-col justify-center transition-all ">
                <h4 className="h4info text-[18px] font-[500] w-full text-left mb-2 relative -right-[100%] opacity-0 ">Big saving days Sale</h4>
                <h2 className="h2info text-[35px] font-[550] w-full relative -right-[100%] opacity-0" >Apple iphone 13 <br /> 128gb pink</h2>
                <h3 className="h3info text-[18px] font-[500] w-full text-left mt-3 mb-3 flex items-center gap-3 relative -right-[100%] opacity-0" >Starting At Only <span className="text-[#ff5252] text-[20px] ">$709.00</span></h3>

                <div className="butoninfo w-full relative -right-[100%] opacity-0">
                    <Button className="btn-org">Shop Now</Button>
                </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
   
  );
};

export default HomeBannerV2;