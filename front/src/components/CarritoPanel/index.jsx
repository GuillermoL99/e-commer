// React y dependencias externas
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Material-UI
import { 
  Button, 
  IconButton, 
  Divider, 
  Chip,
  Badge 
} from '@mui/material'

// Íconos
import { 
  FaTrashAlt, 
  FaPlus, 
  FaMinus,
  FaShoppingCart,
  FaArrowRight 
} from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'

const CarritoPanel = ({ toggleCarritoPanel }) => {
  // const context = useContext(MyContext);
  // const { toggleCarritoPanel } = context;
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Men Opaque Casual Shirt",
      price: 20.00,
      originalPrice: 50.00,
      quantity: 2,
      image: "https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg",
      size: "L",
      color: "Azul"
    },
    {
      id: 2,
      name: "Premium Cotton T-Shirt",
      price: 15.99,
      originalPrice: 25.99,
      quantity: 1,
      image: "https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg",
      size: "M",
      color: "Negro"
    },
    {
      id: 3,
      name: "Casual Summer Dress",
      price: 35.00,
      originalPrice: 65.00,
      quantity: 1,
      image: "https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg",
      size: "S",
      color: "Rosa"
    },
    {
      id: 4,
      name: "Casual Summer Dress",
      price: 35.00,
      originalPrice: 65.00,
      quantity: 1,
      image: "https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg",
      size: "S",
      color: "Rosa"
    },
    {
      id: 5,
      name: "Casual Summer Dress",
      price: 35.00,
      originalPrice: 65.00,
      quantity: 1,
      image: "https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg",
      size: "S",
      color: "Rosa"
    },
    {
      id: 6,
      name: "Casual Summer Dress",
      price: 35.00,
      originalPrice: 65.00,
      quantity: 1,
      image: "https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg",
      size: "S",
      color: "Rosa"
    }
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  const handleCheckout = () => {
    toggleCarritoPanel(false);
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className='w-full h-full bg-white flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-gradient-to-r from-[#ff5252] to-[#ff8a80] rounded-full flex items-center justify-center'>
              <FaShoppingCart className='text-white text-sm' />
            </div>
            <h3 className='text-lg font-bold text-gray-800'>Carrito de Compras</h3>
          </div>
          <Button 
            onClick={() => toggleCarritoPanel(false)}
            className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-gray-100 hover:!bg-gray-200 !text-gray-600'
          >
            <IoCloseOutline className="text-[20px]" />
          </Button>
        </div>

        {/* Empty State */}
        <div className='flex-1 flex items-center justify-center p-8'>
          <div className='text-center'>
            <div className='w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center'>
              <FaShoppingCart className='text-gray-400 text-2xl' />
            </div>
            <h4 className='text-lg font-semibold text-gray-800 mb-2'>Tu carrito está vacío</h4>
            <p className='text-gray-600 mb-6'>¡Agrega algunos productos increíbles!</p>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                borderRadius: '12px',
                padding: '12px 0',
                textTransform: 'none',
                fontWeight: '600',
              }}
            >
              Continuar Comprando
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-full bg-white flex flex-col'>
      {/* Header */}
      <div className='flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-r from-[#ff5252] to-[#ff8a80] rounded-full flex items-center justify-center'>
            <FaShoppingCart className='text-white text-sm' />
          </div>
          <div>
            <h3 className='text-lg font-bold text-gray-800'>Carrito de Compras</h3>
            <p className='text-sm text-gray-600'>{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</p>
          </div>
        </div>
        <Button 
          onClick={() => toggleCarritoPanel(false)}
          className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-gray-100 hover:!bg-gray-200 !text-gray-600'
        >
          <IoCloseOutline className="text-[20px]" />
        </Button>
      </div>

      {/* Items List - Área que se expande */}
      <div className='flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0'>
        {cartItems.map((item) => (
          <div key={item.id} className='bg-gray-50 rounded-xl p-4 transition-all hover:shadow-md'>
            <div className='flex gap-4'>
              {/* Image */}
              <div className='w-25 h-20 rounded-lg overflow-hidden flex-shrink-0'>
                <img 
                  src={item.image} 
                  alt={item.name}
                  className='w-full h-full object-cover'
                />
              </div>

              {/* Info */}
              <div className='flex-1 min-w-0'>
                <h4 className='text-sm font-semibold text-gray-800 mb-1 line-clamp-1'>
                  {item.name}
                </h4>
                
                {/* Variants */}
                <div className='flex gap-2 mb-2'>
                  <Chip label={`Talla: ${item.size}`} size="small" className='!text-xs !h-6' />
                  <Chip label={item.color} size="small" className='!text-xs !h-6' />
                </div>

                {/* Price and Quantity */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-bold text-[#ff5252]'>${item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className='text-xs text-gray-400 line-through'>
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className='flex items-center gap-2'>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className='!w-6 !h-6 !bg-gray-200 hover:!bg-gray-300'
                    >
                      <FaMinus className='text-xs' />
                    </IconButton>
                    
                    <span className='text-sm font-medium w-8 text-center'>
                      {item.quantity}
                    </span>
                    
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className='!w-6 !h-6 !bg-gray-200 hover:!bg-gray-300'
                    >
                      <FaPlus className='text-xs' />
                    </IconButton>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <IconButton
                size="small"
                onClick={() => removeItem(item.id)}
                className='!text-gray-400 hover:!text-red-500 !self-start'
              >
                <FaTrashAlt className='text-xs' />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      {/* Summary - Siempre fijo abajo */}
      <div className='border-t border-gray-100 p-6 space-y-4 flex-shrink-0 bg-white'>
        {/* Totals */}
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span className='text-gray-600'>Subtotal:</span>
            <span className='font-medium'>${subtotal.toFixed(2)}</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-gray-600'>Envío:</span>
            <span className='font-medium'>
              {shipping === 0 ? (
                <span className='text-green-600'>Gratis</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          {shipping > 0 && (
            <p className='text-xs text-gray-500'>
              Envío gratis en compras mayores a $50
            </p>
          )}
          <Divider />
          <div className='flex justify-between text-lg font-bold'>
            <span>Total:</span>
            <span className='text-[#ff5252]'>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='space-y-3'>
          <Button
            variant="contained"
            fullWidth
            endIcon={<FaArrowRight />}
            onClick={handleCheckout}
            sx={{
              background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
              borderRadius: '12px',
              padding: '12px 0',
              textTransform: 'none',
              fontWeight: '600',
              boxShadow: '0 8px 25px rgba(255, 82, 82, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
                boxShadow: '0 12px 35px rgba(255, 82, 82, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Proceder al Checkout
          </Button>
          
         
        </div>
      </div>
    </div>
  )
};

export default CarritoPanel;