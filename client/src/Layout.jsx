import React, {useState} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'

import { assets } from './assets/assets.js'
import './assets/prism.css'
import Loading from './pages/Loading.jsx'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login.jsx'

const Layout = () => {

   const {user} = useAppContext()
  //  user= false
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const {pathname}= useLocation()

   if(pathname === '/loading') return <Loading/>

  return (
   
    <>
    {!isMenuOpen && <img onClick={() => setIsMenuOpen(true)} src={assets.menu_icon} className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert'/>}
    {user ? (
      <div className='dark:bg-linear-to-b from-[#242124] to-[#000000] dark:text-white'>
      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen= {setIsMenuOpen}/>
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