import { lazy, Suspense } from 'react'

import Login from './pages/login/Login'
import Navbar from './components/navbar/Navbar'
import Register from './pages/register/Register'
import Home from "./pages/home/Home"
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import EditPost from './pages/singlePost/EditPost'
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));



function App() {

  return (
    <div className='App'>
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
    <Suspense fallback={<section><h1>Lazy loading</h1></section>}>
     <Routes>
     <Route index element={<Home/>}/>
     <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='register'element={<Register/>} />
      <Route path='login'element={<Login/>} />
      <Route path='/:postId' element={<EditPost/>} />
     </Routes>
     </Suspense>
     </div>
  )
}

export default App
