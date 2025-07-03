import React, {  useRef, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination } from 'swiper/modules';




const ProductZoom = () => {

    const [sliderIndex, setSliderIndex] = useState(0);
    const zoomSliderBig = useRef();
    const zoomSliderSml = useRef();
    const goto = (index) => {
        setSliderIndex(index);
        zoomSliderBig.current.swiper.slideTo(index);
        zoomSliderSml.current.swiper.slideTo(index);
    };
    return (
      <div className="flex gap-3 ">
        <div className="slider w-[15%] ">
          <Swiper
            ref={zoomSliderSml}  
            direction={'vertical'}
            slidesPerView={3}
            spaceBetween={10} 
            modules={[Pagination]}
            className="zoomSwiper h-[500px] overflow-hidden "
          >
            <SwiperSlide>
                <div className={ 'item rounded-md overflow-hidden cursor-pointer group '} onClick={()=> goto(0)}>
                    <img src={"https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg"}
                        className="w-full transition-all group-hover:scale-105"
                    />
                </div>
                
            </SwiperSlide>
            <SwiperSlide>
                <div className='item rounded-md overflow-hidden cursor-pointer group' onClick={()=> goto(1)}>
                    <img src={"https://serviceapi.spicezgold.com/download/1742463096960_hbhb3.jpg"}
                        className="w-full transition-all group-hover:scale-105"
                    />
                </div>
                
            </SwiperSlide>
            <SwiperSlide>
                <div className='item rounded-md overflow-hidden cursor-pointer group' onClick={()=> goto(2)}>
                    <img src={"https://serviceapi.spicezgold.com/download/1742463096961_hbhb4.jpg"}
                        className="w-full transition-all group-hover:scale-105"
                    />
                </div>
                
            </SwiperSlide>
            <SwiperSlide>
                <div className='item rounded-md overflow-hidden cursor-pointer group'  onClick={()=> goto(3)}>
                    <img src={"https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"}
                        className="w-full transition-all group-hover:scale-105"
                    />
                </div>
                
            </SwiperSlide>
          </Swiper>
        </div>
        
        <div className='zoomContainer w-[85%] h-[500px] overflow-hidden '> 
            <Swiper
            ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={0} 
            
          >
            <SwiperSlide>
                <InnerImageZoom
                    src={"https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg"}
                    zoomSrc={""}
                    zoomType="hover"      
                />   
            </SwiperSlide>

            <SwiperSlide>
                <InnerImageZoom
                    src={"https://serviceapi.spicezgold.com/download/1742463096960_hbhb3.jpg"}
                    zoomSrc={""}
                    zoomType="hover"
                      
                />   
            </SwiperSlide>

            <SwiperSlide>
                <InnerImageZoom
                    src={"https://serviceapi.spicezgold.com/download/1742463096961_hbhb4.jpg"}
                    zoomSrc={""}
                    zoomType="hover"
                      
                />   
            </SwiperSlide>

            <SwiperSlide>
                <InnerImageZoom
                    src={"https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"}
                    zoomSrc={""}
                    zoomType="hover"
                   
                />   
            </SwiperSlide>
          </Swiper>   
        </div>
      </div>
    );
};

export default ProductZoom;