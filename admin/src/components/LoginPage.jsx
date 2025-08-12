import React, { useState } from 'react'
import Title from '../components/Title'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const LoginPage = ({setToken}) => {
    const [isshowpassword,setIsshowpassword]=useState(false)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const onsubmit=async(event)=>{
        try {
            event.preventDefault()
            console.log(email,password,'okay')
            if(email===''||password===''){
                toast.error('pls insert field')
                return;
            }
            // vid 8:00:00
            const response=await axios.post(backendUrl + '/api/user/admin',{email,password})
            console.log(response)
            if(response.data.success){
                setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error,'err')
            toast.error(error.message)
        }
    }
    
  return (
    <section>
        <div className="section-conten flex justify-center items-center min-h-[50vh]  mb-[-100px]  ">
            <div className="container flex flex-col items-center ">
                <Title word1={'Login'} word2={'ADMIN'} />
                <form onSubmit={onsubmit} className=' mt-[10px] flex flex-col gap-[10px]  ' action="">
                    <div className="form-group">
                        <input 
                        onChange={(e)=>setEmail(e.target.value)}
                        className='w-[400px] border border-gray-400 placeholder:text-gray-400 px-[10px] py-[5px] rounded-lg  ' placeholder='Email' type="email" name="" id="email" value={email}  />
                    </div>
                    <div 
                    className="form-group relative ">
                        <input
                        onChange={(e)=>setPassword(e.target.value)}
                        className='w-[400px] border border-gray-400 px-[10px] py-[5px] rounded-lg ' placeholder='Password:' type={isshowpassword?'text':'password'} name="" id="password" value={password} />
                        <span onClick={()=>setIsshowpassword(!isshowpassword)} className='text-gray-400 cursor-pointer absolute right-[10px] top-[6px] ' >show</span>
                        <div className="sub-title flex justify-between text-sm text-gray-400 ">
                            <span>Forgot your password?</span>
                            <Link to={'/sign-up'}>
                            <span>Create account</span>
                            </Link>
                        </div>
                    </div>
                    <div className="form-group flex justify-center ">
                        <button className='bg-black text-white cursor-pointer px-[20px] py-[5px] rounded-lg ' >Login</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default LoginPage