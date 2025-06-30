import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';


// import required modules
import { Navigation } from 'swiper/modules';

const HomeCardSlider = () =>{
    return (
      <div className="homeCardSlider">
        <div className="container">
          <Swiper
            slidesPerView={6}
            spaceBetween={25}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-6 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="https://www.zarla.com/images/zarla-destilo-1x1-2400x2400-20220322-wgxvbfcr7ddbyp6qftr6.png?crop=1:1,smart&width=250&dpr=2" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3"> Hogar </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-6 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="../../../public/electro.png" alt="" className="w-[66px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3 "> Electrodomesticos </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-6 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="https://www.zarla.com/images/zarla-destilo-1x1-2400x2400-20220322-wgxvbfcr7ddbyp6qftr6.png?crop=1:1,smart&width=250&dpr=2" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3"> Hogar </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-6 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="https://www.zarla.com/images/zarla-destilo-1x1-2400x2400-20220322-wgxvbfcr7ddbyp6qftr6.png?crop=1:1,smart&width=250&dpr=2" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3 "> Hogar </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-6 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="https://www.zarla.com/images/zarla-destilo-1x1-2400x2400-20220322-wgxvbfcr7ddbyp6qftr6.png?crop=1:1,smart&width=250&dpr=2" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3"> Hogar </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-6 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="https://www.zarla.com/images/zarla-destilo-1x1-2400x2400-20220322-wgxvbfcr7ddbyp6qftr6.png?crop=1:1,smart&width=250&dpr=2" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3 "> Hogar </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-6 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="https://www.zarla.com/images/zarla-destilo-1x1-2400x2400-20220322-wgxvbfcr7ddbyp6qftr6.png?crop=1:1,smart&width=250&dpr=2" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3"> Hogar </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-6 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="https://www.zarla.com/images/zarla-destilo-1x1-2400x2400-20220322-wgxvbfcr7ddbyp6qftr6.png?crop=1:1,smart&width=250&dpr=2" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3 "> Hogar </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-6 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="https://www.zarla.com/images/zarla-destilo-1x1-2400x2400-20220322-wgxvbfcr7ddbyp6qftr6.png?crop=1:1,smart&width=250&dpr=2" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3"> Hogar </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-6 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="https://www.zarla.com/images/zarla-destilo-1x1-2400x2400-20220322-wgxvbfcr7ddbyp6qftr6.png?crop=1:1,smart&width=250&dpr=2" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3 "> Hogar </h3>
                </div>
              </a>
            </SwiperSlide>
           

            
          </Swiper>
        </div>
      </div>
    );
}

export default HomeCardSlider