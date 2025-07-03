
// React y dependencias externas
import React, { useState } from 'react'

// Material-UI
import { Button } from '@mui/material'

// Íconos
import { FaHeart, FaShoppingCart } from 'react-icons/fa'

const ProductDetailComponent = () => {
   
  const [quantity, setQuantity] = useState(1);
  
  const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <>
              <h1 className="text-[28px] font-[700] mb-3 text-gray-800">
                Men Opaque Casual Shirt
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-[600] text-gray-700 text-[14px]">
                  Marca: 
                </span>
                <span className="font-[600] text-[#ff5252] text-[14px]">
                  CLAFOUTIS
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="oldPrice line-through text-gray-400 text-[18px] font-[500]">
                  $50.00
                </span>
                <span className="price text-[#ff5252] font-bold text-[28px]">$20.00</span>
              </div>

              <div className="space-y-3 text-gray-700 mb-6">
                      <p className="text-[14px] leading-relaxed">
                        Esta camisa casual opaca para hombres está confeccionada con materiales de alta calidad 
                        que garantizan comodidad y durabilidad. Su diseño versátil la hace perfecta para 
                        ocasiones casuales y semi-formales.
                      </p>
                      <p className="text-[14px] leading-relaxed">
                        Fabricada con algodón 100% premium, esta camisa ofrece transpirabilidad excepcional 
                        y un ajuste cómodo que se adapta a diferentes tipos de cuerpo.
                      </p>
              </div>

              {/* Cantidad */}
              <div className="mb-4 mt-8">
                <h3 className="text-[16px] font-[600] mb-2">Cantidad:</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-l border-r border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[14px] text-gray-600">
                    {quantity > 10 ? 'Solo 15 disponibles' : 'Disponible'}
                  </span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FaShoppingCart />}
                  className="!bg-[#ff5252] hover:!bg-[#e04848] !text-white !px-8 !py-3 !text-[14px] !font-[600] !rounded-lg"
                >
                  Agregar al Carrito
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<FaHeart />}
                  className="!border-[#ff5252] !text-[#ff5252] hover:!bg-[#ff5252] hover:!text-white !px-4 !py-3 !rounded-lg"
                >
                  Favoritos
                </Button>
              </div>


        </>
    );
};

export default ProductDetailComponent;