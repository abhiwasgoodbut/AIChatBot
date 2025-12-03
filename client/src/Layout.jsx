import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import {AppContextProvider} from './context/AppContext.jsx'

const Layout = () => {
  return (
    <AppContextProvider>
    <>
    <div className='dark:bg-linear-to-b from-[#242124] to-[#000000] dark:text-white'>
      <div className='flex h-screen w-screen'>
        <Sidebar/>
        <Outlet/>
    </div>
    </div>
    
     
    </>
    </AppContextProvider>
  )
}

export default Layout