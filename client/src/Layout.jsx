import React, {useState} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'

import { assets } from './assets/assets.js'
import './assets/prism.css'
import Loading from './pages/Loading.jsx'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login.jsx'
import {Toaster} from 'react-hot-toast'

const Layout = () => {

   const {user,loadingUser} = useAppContext()
  //  user= false
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const {pathname}= useLocation()

   if(pathname === '/loading' || loadingUser) return <Loading/>

  return (
   
    <>
    <Toaster />
    {user ? (
      <div className='dark:bg-linear-to-b from-[#242124] to-[#000000] dark:text-white'>
      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen= {setIsMenuOpen}/>
          {/* ✅ CLICK OUTSIDE TO CLOSE */}
            {isMenuOpen && (
              <div 
                className="fixed inset-0 bg-black/0 md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
            )}
        <Outlet/>
    </div>
    </div>
    ) : (
      <div className='bg-linear-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
        <Login/>
      </div>
    )}
    
    
     
    </>
   
  )
}

export default Layout