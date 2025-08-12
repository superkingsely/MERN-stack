import React from 'react'
import {assets} from '../assets/admin_assets/assets'
const Header = ({setToken}) => {
  return (
   <header>
        <div className="header-content flex justify-between max-w-[1200px] mx-auto min-h-[10vh] items-center ">
            <span className="logo font-[600] text-[30px]  sm:text-[46px] ">superking</span>
            <button onClick={()=>setToken('')} className='text-white bg-gray-700 py-[10px] px-[15px] cursor-pointer hover:bg-black ' >Logout</button>
        </div>
   </header>
  )
}

export default Header