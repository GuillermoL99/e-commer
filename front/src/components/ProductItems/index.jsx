// React y dependencias externas
import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"

// Material-UI
import { Button, Rating, Chip } from "@mui/material"

// Íconos
import { MdOutlineZoomOutMap } from "react-icons/md"
import { FaHeart, FaShoppingCart } from "react-icons/fa"

// Contexto y estilos locales
import { MyContext } from "../../App"
import "../ProductItems/estilos.css"

const ProductItem = () => {
  const [isHovered, setIsHovered] = useState(false);
  const context = useContext(MyContext);

  return (
    <div 
      className="productItem rounded-md shadow-lg overflow-hidden border-2 border-[rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges superiores */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
        <Chip label="Nuevo" size="small" className="!bg-[#ff5252] !text-white !text-[11px] !h-[20px]" />
        <Chip label="-60%" size="small" className="!bg-red-600 !text-white !text-[11px] !h-[20px]" />
      </div>

      <div className="group imgWrapper w-full rounded-md relative">
        <Link to="/product/1234">
          <div className="img relative h-[220px] overflow-hidden">
            {/* Imagen principal */}
            <img
              src="https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
              className="w-full h-full object-cover transition-transform duration-300"
              alt="principal"
            />
            {/* Imagen secundaria, aparece al hover */}
            <img
              src="https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg"
              className="w-full h-full object-cover absolute top-0 left-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
              alt="hover"
            />
          </div>
        </Link>

        {/* Botones de acción */}
        <div className="actions absolute top-[180px] right-[10px] z-50 flex items-center gap-2 flex-col transition-all duration-300 group-hover:top-[10px] opacity-0 group-hover:opacity-100">
          <Button className="!w-[32px] !h-[32px] !min-w-[32px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white !shadow-md">
            <FaHeart className="text-[14px]" />
          </Button>
          <Button className="!w-[32px] !h-[32px] !min-w-[32px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white !shadow-md"
            onClick={() => context.setOpenProductDetailModal(true)}
          >
            <MdOutlineZoomOutMap className="text-[14px]" />
          </Button>
        </div>

        {/* Botón Agregar al carrito (aparece en hover) */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <Button 
            variant="contained" 
            fullWidth
            startIcon={<FaShoppingCart />}
            className="!bg-[#ff5252] hover:!bg-[#e04848] !text-white !text-[12px] !font-[600] !py-2"
          >
            Agregar al Carrito
          </Button>
        </div>
      </div>

      <div className="info p-3 py-4">
       

        {/* Categoría */}
        <h6 className="text-[11px] mb-1 text-gray-600 uppercase tracking-wide">
          <Link to="/" className="link transition-all hover:text-[#ff5252]">
            Remera verde
          </Link>
        </h6>

        {/* Título del producto */}
        <h3 className="text-[14px] title mb-2 font-[600] text-[#000] line-clamp-2 leading-tight">
          <Link to="/product-details" className="link transition-all hover:text-[#ff5252]">
            Men Opaque Casual Shirt Premium Quality
          </Link>
        </h3>

        {/* Precios */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="price text-[#ff5252] font-bold text-[16px]">$20.00</span>
            <span className="oldPrice line-through text-gray-400 text-[12px] font-[500]">
              $50.00
            </span>
          </div>
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-[10px] font-[600]">
            En Stock
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;