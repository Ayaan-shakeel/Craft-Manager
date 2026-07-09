"use client"
import React,{useEffect} from 'react'
import {useRouter} from "next/navigation"
export default function Protectedlayout({children}: {children: React.ReactNode}) {
      const router=useRouter()
        useEffect(()=>{
           const token=localStorage.getItem("token");
           if (!token) {
    
            router.replace("/login")
           }
        },[router])
  return (
    <>{children}</>
  )
}
