import { useState } from 'react'
import Login from './pages/login/Login'
import Navbar from './components/navbar/Navbar'
import Register from './pages/register/Register'
import Home from "./pages/dashboard/Dashboard"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    // <BrowserRouter>
    <div>
    <Navbar/>
    <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
     <Routes>
     <Route index element={<Home/>}/>
      <Route path='register'element={<Register/>} />
      <Route path='login'element={<Login/>} />
     </Routes>
     </div>
    //  </BrowserRouter>
  )
}

export default App
