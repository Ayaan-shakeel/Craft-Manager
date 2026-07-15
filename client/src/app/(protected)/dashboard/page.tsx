"use client"
import React, { useEffect, useState } from 'react'
import {getDashboardData} from "@/services/dashboardService";
import DashboardCard from '@/components/DashboardCard'
import {
Users,
ShoppingBag,
CheckCircle2,
Clock3,
IndianRupee,
} from "lucide-react";
export default function DashboardPage() {
  const [dashboard,setDashboard]=useState({
    total_customers:0,
    total_orders:0,
    total_revenue:0,
    total_pending_orders:0,
    total_completed_orders:0
  })
  useEffect(()=>{
      const fetchData=async()=>{
        try{
          const response=await getDashboardData();
          console.log("mala")
          if(response.dashboard){
            console.log("Billi ne mara panja")
            console.log("Dashboard data:",response.dashboard)
          setDashboard(response.dashboard) 
          }
        }catch(error){
          console.error("Error fetching dashboard data:",error)
        }
      }
      fetchData()
    },[])
   
  return (

<div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-slate-100 px-3 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
  <div className="mx-auto w-full max-w-7xl">
    
    <div className="mb-6 rounded-3xl border border-slate-200/80 bg-white/80 px-5 py-6 shadow-sm backdrop-blur-sm sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Welcome Back Dashboard
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
        Here is a quick overview of your customers, orders, and revenue.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <DashboardCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Customers</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {dashboard.total_customers}
            </h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Users size={22} />
          </div>
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Orders</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {dashboard.total_orders}
            </h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <ShoppingBag size={22} />
          </div>
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Completed Orders</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {dashboard.total_completed_orders}
            </h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={22} />
          </div>
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Orders</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {dashboard.total_pending_orders}
            </h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Clock3 size={22} />
          </div>
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Revenue</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              ₹ {dashboard.total_revenue.toLocaleString("en-IN")}
            </h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <IndianRupee size={22} />
          </div>
        </div>
      </DashboardCard>
    </div>
  </div>
</div>
  )
}
