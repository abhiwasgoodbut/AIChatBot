import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'

import { assets } from './assets/assets.js'
import './assets/prism.css'
import Loading from './pages/Loading.jsx'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login.jsx'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  const { user, loadingUser } = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()

  if (pathname === '/loading' || loadingUser) return <Loading />

  return (
    <>
      <Toaster />

      {/* Mobile Menu Button */}
      {!isMenuOpen && user && (
        <img
          onClick={() => setIsMenuOpen(true)}
          src={assets.menu_icon}
          className="fixed top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert z-50"
        />
      )}

      {user ? (
        <div className='dark:bg-linear-to-b from-[#242124] to-[#000000] dark:text-white h-[100dvh] w-screen flex relative overflow-hidden'>

          {/* Sidebar */}
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          {/* Overlay for mobile */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 md:hidden z-30"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Main Chat Area */}
          <div className="flex-1 h-dvh overflow-hidden">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className='bg-linear-to-b from-[#242124] to-[#000000] flex items-center justify-center h-[100dvh] w-screen'>
          <Login />
        </div>
      )}
    </>
  )
}

export default Layout
