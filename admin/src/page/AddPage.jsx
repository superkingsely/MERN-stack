import React, { useEffect } from 'react'
import { assets } from '../assets/admin_assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const AddPage = ({token}) => {
  const [image1,setImage1]=useState(false)
  const [image2,setImage2]=useState(false)
  const [image3,setImage3]=useState(false)
  const [image4,setImage4]=useState(false)

  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  const [price,setPrice]=useState('')
  const [category,setCategory]=useState('Men')
  const [subCategory,setSubCategory]=useState('Topwear')
  const [bestSeller,setBestSeller]=useState(false)
  const [size,setSize]=useState([])

  const imageArray=[
    {
      name:'image1',
      setImage:setImage1,
      state:image1
    },
    {
      name:'image2',
      setImage:setImage2,
      state:image2
    },
    {
      name:'image3',
      setImage:setImage3,
      state:image3
    },
    {
      name:'image4',
      setImage:setImage4,
      state:image4
    }
  ]
  // fn vid 8:41:50
  const handleSize=(sizestring)=>{
    setSize(prev=>{
      return prev.includes(sizestring)?prev.filter(string=>string!==sizestring):[...prev,sizestring]
    })

  }
  
  useEffect(()=>{
    console.log(size,image1,bestSeller)

  },[size,image1,bestSeller])

  const handlesubmit=async(e)=>{
    e.preventDefault()
    try {
      const formData= new FormData()
      // the string are the d database or req.body prop
      formData.append('name',name)
      formData.append('description',description)
      formData.append('price',price)
      formData.append('category',category)
      formData.append('subCategory',subCategory)
      formData.append('bestSeller',bestSeller)
      // formData.append('bestseller',bestseller)
      formData.append('size',JSON.stringify(size))

      image1 && formData.append('image1',image1)
      image2 && formData.append('image2',image2)
      image3 && formData.append('image3',image3)
      image4 && formData.append('image4',image4)
      // post(url,body,headers)
      const response=await axios.post(backendUrl+'/api/products/add',formData,{headers:{token}})
      if(response.data.success===false){
        toast.error(response.data.message)
      }
      if(response.data.success){
        toast.success(response.data.message)
        // vid 9:00:00 to clear the product add form
        // setName('')
        // setDescription('')
        // setImage1(false)
        // and so on
      }
      console.log(response.data)
    } catch (error) {
       console.log(error,'err')
       toast.error(error.message)
    }
  }
 
  return (
    <form onSubmit={handlesubmit} className='flex  flex-col w-[100%] items-start gap-3 ' >
        <div className="">
          <p className='mb-2' >Upload image</p>
          <div className="flex gap-2">

             {/* <label htmlFor={'image1'}  >
              <div className="img w-[100px] cursor-pointer ">
              <img src={image1?assets.upload_area:(image1 instanceof File || image1 instanceof Blob) ? URL.createObjectURL(image1) : assets.upload_area} alt="" />
              </div>
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id={'image1'} hidden />
            </label> */}
          {/* use effect to clean memory leak from url.createobject url */}
            {
              imageArray.map((obj,index)=>{
                return(

            <label htmlFor={obj.name} key={index} >
              <div className="img w-[100px] cursor-pointer ">
              <img src={!obj.state?assets.upload_area:(obj.state instanceof File || obj.state instanceof Blob) ? URL.createObjectURL(obj.state) : assets.upload_area} alt="" />
              </div>
              <input onChange={(e)=>obj.setImage(e.target.files[0])} type="file" id={obj.name} hidden />
            </label>
                )
              })
            }
            </div>
        </div>
        {/* prod name */}
        <div className="w-[100%]">
          <p className='mb-2' >Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-[100%] max-w-[500px] px-3 py-2 ' type="text" placeholder='Type here' required/>
        </div>
        {/* prod description */}
        <div className="w-[100%]">
          <p className='mb-2' >Product Description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-[100%] max-w-[500px] px-3 py-2 ' type="text" placeholder='Type here' />
        </div>
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-8 ' >
        {/* prod cart  */}
            <div>
              <p className='mb-2' >product cartegory</p>
              <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2 ' >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div>
              <p className='mb-2' >Sub cartegory</p>
              <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2 ' >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            {/* price */}
            <div className="">
              <p className='mb-2' >price</p>
              <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px] ' type="number" placeholder='25' />
            </div>
        </div>
        {/* sizes */}
        <div>
          <p className='mb-2 ' >product sizes</p>
          <div className='flex gap-3' >
            <div onClick={()=>handleSize('S')} >
              <p className={`${size.includes('S')?'bg-pink-100':'bg-slate-300'} px-[5px] py-[5px] cursor-pointer `} >S</p>
            </div>
            <div onClick={()=>handleSize('M')} >
              <p className={`${size.includes('M')?'bg-pink-100':'bg-slate-300'} px-[5px] py-[5px] cursor-pointer `} >M</p>
            </div>
            <div onClick={()=>handleSize('L')} >
              <p className={`${size.includes('L')?'bg-pink-100':'bg-slate-300'} px-[5px] py-[5px] cursor-pointer `} >L</p>
            </div>
            <div onClick={()=>handleSize('XL')} >
              <p className={`${size.includes('XL')?'bg-pink-100':'bg-slate-300'} px-[5px] py-[5px] cursor-pointer `} >XL</p>
            </div>
            <div onClick={()=>handleSize('XXL')} >
              <p className={`${size.includes('XXL')?'bg-pink-100':'bg-slate-300'} px-[5px] py-[5px] cursor-pointer `} >XXL</p>
            </div>
           
            {/* vid 8:27:05 */}
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <input onChange={()=>setBestSeller(prev=>!prev)} checked={bestSeller} type="checkbox" name="" id="bestseller" />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>
        <button type='submit' className='w-28 py-3 mt-4 bg-black text-white cursor-pointer ' >ADD</button>
    </form>
  )
}

export default AddPage