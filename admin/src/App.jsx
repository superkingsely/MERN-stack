import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/sidebar'
import { Route, Routes } from 'react-router-dom'
import AddPage from './page/addPage'
import ListPage from './page/listPage'
import OrdersPage from './page/ordersPage'
import LoginPage from './components/LoginPage'
import { ToastContainer } from 'react-toastify';

export const backendUrl=import.meta.env.VITE_BACKEND_URL

const App = () => {
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
  // 8:10:13 we need the local storage to prevent reloadback to login
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div>
      <ToastContainer/>
        {
          token===''?(<LoginPage setToken={setToken} />):(

    <>
      <Header setToken={setToken} />
      <hr />
      <main>
        <div className="main-content max-w-[1200px] mx-auto flex w-full ">

        <div className="side-bar flex-1/12  sm:flex-3/12 ">
          <Sidebar/>
        </div>
        <div className="pages flex-11/12 sm:flex-9/12 border p-[20px] sm:p-[50px]  ">
      <Routes>
      <Route path='/' element={<AddPage token={token} />} />
      <Route path='/add' element={<AddPage token={token} />} />
      <Route path='/list' element={<ListPage token={token} />} />
      <Route path='/orders' element={<OrdersPage token={token} />} />
    </Routes>
        </div>
        </div>
      </main>
      {/* footer */}
    </>
          )
        }
    </div>
  )
}

export default App