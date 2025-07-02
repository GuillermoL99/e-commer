import { useState } from 'react'
import Header from './components/Headre'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ProductListing from './Pages/ProductListing'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} exact={true} element={<Home/>} />
        <Route path={"/product-listing"} exact={true} element={<ProductListing/>} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </BrowserRouter>
     
    </>
  )
}

export default App
