import React from 'react';
import "../ProductItems/estilos.css";
import { Link } from "react-router-dom";
import { MdOutlineZoomOutMap } from "react-icons/md";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";

const ProductItemListView = ({ products = [] }) => {
    return (
        <div className="productItem rounded-md shadow-lg overflow-hidden border-2 border-[rgba(0,0,0,0.1)] flex items-center ">
      <div className="group imgWrapper w-[25%] rounded-md relative">
        <Link to="/">
          <div className="img relative h-[230px] overflow-hidden">
            {/* Imagen principal */}
            <img
              src="https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
              className="w-full "
              alt="principal"
            />
            {/* Imagen secundaria, aparece al hover */}
            <img
              src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg"
              className="w-full  absolute top-0 left-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
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

      <div className="info p-3 py-5 px-8 w-[75%] ">
        <h6 className="text-[15px] mb-2">
          <Link to="/" className="link transition-all">
            Remera verde
          </Link>
        </h6>
        <h3 className="text-[18px] title mb-3 font-[500] text-[#000] ">
          <Link to="/" className="link transition-all">
            Men Opaque Casual Shirt
          </Link>
        </h3>
        <p className="text-[14px] text-gray-500 font-[400] mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
        </p>
        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500] ">
            $50.00
          </span>
          <span className="price text-[#ff5252] font-bold ">$20.00</span>
        </div>

        <div className='mt-3'>
          <Button className='btn-org flex gap-2'>
            <ShoppingCartIcon className='!text-[20px] '/>
            Agregar
          </Button>
        </div>
      </div>
    </div>
    );
};

export default ProductItemListView;