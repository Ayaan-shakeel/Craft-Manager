"use client"
import React, { useState } from 'react'
import { RegisterUser } from '@/services/authService'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:""
    })
    const router=useRouter()
    const handleRegister=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            const response=await RegisterUser({
                name:formData.name,
                email:formData.email,
                password:formData.password
            })
            if(response.access_token){
                localStorage.setItem('token',response.access_token);
                localStorage.setItem('user',JSON.stringify(response.new_user))
                console.log('Registration successful:',response)
                alert("Sign up Successfully ")
                setFormData({name:"",email:"",password:""})
                router.push("/dashboard")

            }
        }catch(err){
            alert("wrong Credentials")
            console.log("Wrong Credentials",err)
        }
    }
  return (
    <div className="flex justify-center items-center bg-linear-to-r from-blue-400 to-gray-200 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-all-duration-300 hover:shadow-xl hover:scale-105 ">
            <h1 className="text-center font-bold text-3xl mb-5">Sign Up</h1>
            <form onSubmit={handleRegister}>
                <div className="space-y-4">
                <label className="mt-3 block mb-2 font-semibold">
                    Name
                </label>
                <input
                className="w-full p-3 rounded-lg border"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e)=>setFormData({...formData,name:e.target.value})}
                required
                />
                </div>
                <div className="space-y-4">
                <label className="mt-3 block mb-2 font-semibold">
                    Email
                </label>
                <input
                className="w-full p-3 rounded-lg border"
                type="email"
                placeholder="Enter your email"
                 value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                required
                />
                </div>
                <div className="space-y-4">
                <label className="mt-3 block mb-2 font-semibold">
                    Password
                </label>
                <input
                className="w-full p-3 rounded-lg border"
                type="password"
                placeholder="Enter your password"
                 value={formData.password}
                onChange={(e)=>setFormData({...formData,password:e.target.value})}
                required
                />
                </div>
                <button 
                type="submit"
                 className="w-full bg-blue-500 text-white p-3 rounded-lg mt-5 font-semibold hover:bg-blue-600"
                 >
                    Sign Up
                    </button>
                    <p className="mt-4 text-center">Already have an account ? {""}
                        <Link href="/login"
                        className="text-blue-500 hover:underline font-semibold"
                        >
                        Login
                        </Link>
                         </p>
            </form>
        </div>
    </div>
  )
}
