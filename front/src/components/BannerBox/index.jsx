import React from "react";
import "./estilos.css"
import { Link } from "react-router-dom";

const BannerBox = (props) => {
  return (
    <div className="bannerBox w-full overflow-hidden rounded-md group relative">
      <img src={props.image} alt="Product banner" className="w-full transition-all duration-100 group-hover:scale-105" />
      <div 
        className={`info absolute top-0 p-5 
            ${props.info==="left" ? 'left-0' : 'right-0'} 
        w-[70%] h-[100%] z-50 flex items-center justify-center flex-col gap-2 
        
            ${props.info==="left" ? '' :'pl-20'}`  
        
        }>

        <h2  className="text-[20px] font-[600] ">Buy men Footwear with low price</h2>

        <span className="text-[20px] text-[#ff5252] font-[500] w-full ">$200</span>
        <div className="w-full">
            <Link to="/" className="text-[16px] font-[500] link">SHOP NOW</Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBox;