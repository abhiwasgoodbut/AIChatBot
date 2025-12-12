import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import {AppContextProvider} from './context/AppContext.jsx'
import { assets } from './assets/assets.js'
import './assets/prism.css'

const Layout = () => {

   const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <AppContextProvider>
    <>
    {!isMenuOpen && <img onClick={() => setIsMenuOpen(true)} src={assets.menu_icon} className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert'/>}
    <div className='dark:bg-linear-to-b from-[#242124] to-[#000000] dark:text-white'>
      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen= {setIsMenuOpen}/>
        <Outlet/>
    </div>
    </div>
    
     
    </>
    </AppContextProvider>
  )
}

export default Layout