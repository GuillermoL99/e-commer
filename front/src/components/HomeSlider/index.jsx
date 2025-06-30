import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const HomeSlider = () =>{
    return (
      <>
        <div className="HomeSlider py-4">
          <div className="container">
            <Swiper
              spaceBetween={10}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="sliderHome"
            >
              <SwiperSlide>
                <div className="item rounded-[20px] overflow-hidden">
                    <img
                  src="https://serviceapi.spicezgold.com/download/1748955883517_NewProject(6).jpg"
                  alt="Baneer "
                  className="w-full"
                />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item rounded-[20px] overflow-hidden">
                <img
                  src="https://serviceapi.spicezgold.com/download/1748955908049_NewProject(13).jpg"
                  alt="Baneer "
                  className="w-full"
                />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item rounded-[20px] overflow-hidden">
                <img
                  src="https://serviceapi.spicezgold.com/download/1748955943280_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg"
                  alt="Baneer "
                  className="w-full"
                />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item rounded-[20px] overflow-hidden">
                <img
                  src="https://serviceapi.spicezgold.com/download/1748955932914_NewProject(1).jpg"
                  alt="Baneer "
                  className="w-full"
                />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </>
    );
}

export default HomeSlider