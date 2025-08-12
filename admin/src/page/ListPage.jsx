import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const ListPage = ({token}) => {
  const [list,setList]=useState([])
  const fetchList=async()=>{
    try {
      const res=await axios.get(backendUrl+'/api/products/list')
      console.log(res)
      if(res.data.success){
        setList(res.data.products)
      }else{
        console.log(res.data.message)
        toast.error('Bad Server')
      }
      
    } catch (error) {
      console.log(error,'err',error.message)
      toast.error(error.message+'/err')
    }
  }
  const removeProduct=async(id)=>{
    try {
      const res=await axios.post(backendUrl+'/api/products/remove',{id},{headers:{token}})

      if(res.data.success){
        toast.success(res.data.message)
        await fetchList()
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
       console.log(error,'err',error.message)
      toast.error(error.message+'/err')
    }
  }
  useEffect(()=>{
    console.log(list,'okau')
    fetchList()
  },[])
  return (
   <>
    <p className="mb-2">All products List</p>
   <div>
  {/* Table Header */}
  <div className='hidden sm:grid grid-cols-[48px_2fr_2fr_1fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm h-[48px]'>
    <span className="font-bold">Image</span>
    <span className="font-bold">Name</span>
    <span className="font-bold">Category</span>
    <span className="font-bold">Price</span>
    <span className="font-bold text-center">Action</span>
  </div>

  {/* Product Rows */}
  {
    list.map((obj, index) => (
      <div key={index} className='grid grid-cols-[48px_2fr_2fr_1fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm'>
        <div className="img w-[48px] h-[48px] overflow-hidden">
          <img src={obj.image[0]} alt="" className="w-full h-full object-cover" />
        </div>
        <p>{obj.name}</p>
        <p>{obj.category}</p>
        <p>${obj.price}</p>
        <p onClick={() => removeProduct(obj._id)} className='text-right sm:text-center cursor-pointer text-lg'>X</p>
      </div>
    ))
  }
  </div>

   </>
  )
}

export default ListPage