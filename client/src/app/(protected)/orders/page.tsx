'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import OrdersStats from '@/components/orders/OrdersStats'

export default function OrdersPage() {
  const router=useRouter()
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10 mb-10 ">
      Orders Page
      </h1>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8 lg:mb-10">
                <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl lg:text-4xl">
                  Manage your orders
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-500 sm:mt-3 sm:text-base lg:text-lg">
                  Update status, and review customer order details.
                </p>
              </div>
              {/* <OrdersStats stats={stats}/> */}
              </div>
      <div className="mb-6 rounded-3xl border border-slate-200/80 bg-white/80 px-5 py-6 shadow-sm backdrop-blur-sm sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
       
   <button onClick={()=>router.push("/orders/create-orders")}>Add orders</button>
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
       Create your new Orders Here.
      </p>

    </div>

    <div className="mb-6 rounded-3xl border border-slate-200/80 bg-white/80 px-5 py-6 shadow-sm backdrop-blur-sm sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        
   <button onClick={()=>router.push("/orders/get-orders")}>View orders</button>
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
        View | Edit your Orders Here.
      </p>
    </div>

    </div>

  )
}
