'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
export default function OrdersPage() {
  const router=useRouter()
  return (
    <div>
      <h1>
      Orders Page
      </h1>
   <button onClick={()=>router.push("/orders/create-orders")}>Add orders</button>
   <button onClick={()=>router.push("/orders/get-orders")}>View orders</button>
    </div>

  )
}
