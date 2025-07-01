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
            slidesPerView={5}
            spaceBetween={25}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-8 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="https://www.zarla.com/images/zarla-destilo-1x1-2400x2400-20220322-wgxvbfcr7ddbyp6qftr6.png?crop=1:1,smart&width=250&dpr=2" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3"> Linea blanca y climatizacion </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-5 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="../../../public/electro.png" alt="" className="w-[66px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3 "> Electrodomésticos de Cocina y Hogar </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-4 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="../../../public/hogar.png" alt="" className="w-[87px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3"> Muebles y Equipamiento para el Hogar </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-8 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="../../../public/descanso.png" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3 "> Descanso y Dormitorio </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-8 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="../../../public/pngwing.com.png" alt="" className="w-[120px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3"> Tecnología y Electrónica </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-5 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="../../../public/herramientaequipoo.png" alt="" className="w-[63px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3 "> Herramientas y Equipos Especiales </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-8 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="https://www.zarla.com/images/zarla-destilo-1x1-2400x2400-20220322-wgxvbfcr7ddbyp6qftr6.png?crop=1:1,smart&width=250&dpr=2" alt="" className="w-[60px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3"> Vehículos y Movilidad </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hogar">
                <div className="item py-8 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col">
                  <img src="../../../public/ocio.png" alt="" className="w-[80px] transition-all "/>
                  <h3 className="text-[15px] font-[500] mt-3 relative top-3 "> Camping y Ocio </h3>
                </div>
              </a>
            </SwiperSlide>
           
           
           

            
          </Swiper>
        </div>
      </div>
    );
}

export default HomeCardSlider