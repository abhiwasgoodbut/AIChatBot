import React, { useState } from 'react'
import {Route , RouterProvider, createRoutesFromElements, createBrowserRouter} from "react-router-dom"
import Layout from './Layout'
import Credits from './pages/Credits'
import ChatBox from './components/ChatBox'
import Community from './pages/Community'


const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element ={<Layout/>}>
      <Route path='' element = {<ChatBox/>} />
      <Route path='credits' element = {<Credits/>} />
      <Route path='community' element = {<Community/>} />
    </Route>
  )
)

const App = () => {
 
  return (
    <RouterProvider router={route}>
      
    </RouterProvider>
  )
}

export default App