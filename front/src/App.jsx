import { useState } from 'react'
import Header from './components/Headre'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} exact={true} element={<Home/>} />
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
