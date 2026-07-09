'use client'

import { useState } from "react"

import { LoginUser } from '@/services/authService'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })
 const router=useRouter()
  const handleLogin=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  try{
    const response=await LoginUser({
      email:formData.email,
      password:formData.password
    })
    if(response.access_token){
      localStorage.setItem('token',response.access_token);
      localStorage.setItem('user',JSON.stringify(response.user))
      console.log('Login successful:', response);
      alert('Login successful')
      setFormData({email:"",password:""})
      router.push('/dashboard')
    }
  } catch(error){
    console.log(error)
    alert("wrong credentials")
  }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-linear-to-r from-blue-400 to-gray-200 '>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-all-duration-300 hover:shadow-xl hover:scale-105 '>
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <label className="mb-1 block mt-3 font-semibold">
              Email
            </label>
            <input 
            className="w-full p-3 rounded border"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            />

          </div>
          <div className="space-y-4 mt-3">
            <label className="mb-1 block font-semibold">
              Password
            </label>
            <input 
            className="w-full p-3 rounded border"
            type="password"
            placeholder="Enter your password"
             value={formData.password}
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
            />

          </div>
          <button 
          type="submit"
          className="w-full bg-blue-500 text-white p-3 font-semibold mt-5 hover:bg-blue-600 rounded-lg"
          >
            Login
            </button>
            <p className="mt-4 text-center">{"Don't have an account ? "}{""}
                                    <Link href="/register"
                                    className="text-blue-500 hover:underline font-semibold"
                                    >
                                    Register
                                    </Link>
                                     </p>
        </form>

      </div>
      
    </div>
  )
}