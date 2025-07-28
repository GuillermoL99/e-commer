// React y dependencias externas
import React, { useState, createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Contexto de autenticación
import { AuthProvider } from './components/hooks/useAuth'

// Material-UI
import { 
  Button, 
  Dialog, 
  DialogContent, 
} from '@mui/material'
import Drawer from '@mui/material/Drawer';

// Íconos
import { IoCloseOutline } from "react-icons/io5"

// Páginas
import Home from './Pages/Home'
import ProductListing from './Pages/ProductListing'
import ProductDetails from './Pages/ProductDetails'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Verify from './Pages/Verify'
import ForgotPassword from './Pages/ForgotePassword'
import CheckOut from './Pages/CheckOut'
import Profile from './Pages/Profile'
import MyOrders from './Pages/MyOrders'


// Componentes
import Header from './components/Headre'
import Footer from './components/Footer'
import ProductZoom from './components/ProductZoom'
import ProductDetailComponent from './components/ProductDetailComponent'
import CarritoPanel from './components/CarritoPanel';


const MyContext = createContext();

function App() {
  
   {/* logica para modal de productos */}
  const [openProductDetailModal, setOpenProductDetailModal] = useState(false);
    {/* logica para carritoCompra */}  
  const [openCarritoPanel, setOpenCarritoPanel] = useState(false);

  const [maxWidth, setMaxWidth] = useState('lg');
  const [fullWidth, setFullWidth] = useState(true);

  const handleCloseProductDetailModal = () => {
    setOpenProductDetailModal(false);
  };

  const toggleCarritoPanel = (newOpen) => {
    setOpenCarritoPanel(newOpen);
  };

  const values = {
    setOpenProductDetailModal,
    setOpenCarritoPanel,
    toggleCarritoPanel
   }

  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <MyContext.Provider value={values}>
        <Header />
        <Routes>
        <Route path={"/"} exact={true} element={<Home/>} />
        <Route path={"/product-listing"} exact={true} element={<ProductListing/>} />
        <Route path={"/product/:id"} exact={true} element={<ProductDetails/>} />
        <Route path={"/login"} exact={true} element={<Login/>} />
        <Route path={"/register"} exact={true} element={<Register/>} />
        <Route path={"/verify"} exact={true} element={<Verify/>} />
        <Route path={"/forgot-password"} exact={true} element={<ForgotPassword/>} />
        <Route path={"/checkout"} exact={true} element={<CheckOut/>} />
        <Route path={"/profile"} exact={true} element={<Profile/>} />
        <Route path={"/my-orders"} exact={true} element={<MyOrders/>} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />

      {/* modal para mostra info de tarjetas */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openProductDetailModal}
        onClose={handleCloseProductDetailModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productDetailModal'
        PaperProps={{
          style: {
            borderRadius: '12px',
            maxHeight: '90vh'
          }
        }}
      >
       
        <DialogContent className="!p-0 !overflow-hidden">
          <div className='flex items-start w-full productDetailModalContainer relative bg-white'>
            <Button 
              className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-gray-100 hover:!bg-gray-200 !text-gray-600 !absolute !top-[15px] !right-[15px] !z-50 !shadow-md'
              onClick={handleCloseProductDetailModal}
            >
              <IoCloseOutline className="text-[18px]"/>
            </Button>
            
            <div className='col1 w-[45%] p-6 bg-gray-50'>
              <div className="sticky top-0">
                <ProductZoom />
              </div>
            </div>
            
            <div className='col2 w-[55%] p-6 productContent max-h-[80vh] overflow-y-auto'> 
              <ProductDetailComponent />
            </div>
          </div>
        </DialogContent>
        
      </Dialog>

      {/* componente carroCompra */} 
      <Drawer 
        open={openCarritoPanel} 
        onClose={() => toggleCarritoPanel(false)} 
        anchor="right"
        sx={{
          '& .MuiDrawer-paper': {
            width: 450,
            maxWidth: '90vw',
            borderRadius: '0',
            height: '100vh',
            overflowY: 'hidden'
          }
        }}
      >
        <CarritoPanel toggleCarritoPanel={toggleCarritoPanel}/>
      </Drawer>

      </MyContext.Provider>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
export { MyContext };