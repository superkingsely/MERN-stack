import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'
// 7:40:0
const Sidebar = () => {
    const navlinks=[
        {
            name:'Add Items',
            url:'/add',
            icon:assets.add_icon
        },
        {
            name:'List Items',
            url:'/list',
            icon:assets.order_icon
        },
        {
            name:'Orders',
            url:'/orders',
            icon:assets.order_icon
        },
    ]

  return (
    <div className='sidebar w-[100%] min-h-[80vh] border-r-2  border-gray-300' >
        <div className="flex flex-col pl-[20%] pt-6 text-[15px] gap-4 ">
            {
                navlinks.map((obj,index)=>{
                    return(

        <NavLink key={index} className={'flex items-center justify-center sm:justify-start gap-3 border border-gray-300 border-r-0 sm:pl-[30px]  px-[10px] '} to={obj.url}>
            <div className="img w-5 h-5 ">
            <img src={obj.icon} alt="" />
            </div>
            <p className='hidden md:block ' >{obj.name}</p>
        </NavLink>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Sidebar