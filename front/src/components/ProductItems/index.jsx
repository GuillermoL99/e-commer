import React from "react";
import "../ProductItems/estilos.css";
import { Link } from "react-router-dom";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { Button } from "@mui/material";





const ProductItem = () => {
  return (
    <div className="productItem rounded-md shadow-lg overflow-hidden border-2 border-[rgba(0,0,0,0.1)] ">
      <div className="group imgWrapper w-[100%]  rounded-md relative ">
        <Link to="/">
    <div className="img relative h-[220px] overflow-hidden">
      {/* Imagen principal */}
      <img
        src="https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
        className="w-full h-full object-cover block"
        alt="principal"
      />
      {/* Imagen secundaria, aparece al hover */}
      <img
        src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg"
        className="w-full h-full object-cover absolute top-0 left-0 transition-all duration-300 opacity-0 group-hover:opacity-100 "
        alt="hover"
      />
    </div>
  </Link>

        <div className="actions absolute top-[210px] right-[15px] z-50 flex items-center gap-2 flex-col w-[30px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full  !bg-white text-black hover:!bg-[#ff5252] ">
            <MdOutlineZoomOutMap className="text-[18px] !text-black group-hover:text-white " />
          </Button>
        </div>
      </div>

      <div className="info p-3 py-5 ">
        <h6 className="text-[13px] ">
          <Link to="/" className="link transition-all">
            Remera verde
          </Link>
        </h6>
        <h3 className="text-[13px] title m-1 font-[500] text-[#000] ">
          <Link to="/" className="link transition-all">
            asdasdasdasdasd asdas
          </Link>
        </h3>
        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500] ">
            $50.00
          </span>
          <span className="price text-[#ff5252] font-bold ">$20.00</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;