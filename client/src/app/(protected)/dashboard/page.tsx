"use client"
import React, { useEffect, useState } from 'react'
import {getDashboardData} from "@/services/dashboardService";
import DashboardCard from '@/components/DashboardCard'
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
    <div className=" min-h-screen bg-linear-to-r from-blue-400 to-gray-200">
      <h1 className="font-bold text-4xl sm:text:3xl  text-center mb-6 mt-6 text-gray-900">
        Welcome Back  Dashboard
        </h1>
        <div>

        <DashboardCard>
          <h2>Total Customers</h2>
          <p>{dashboard.total_customers}</p>
        </DashboardCard>
        <DashboardCard>
          <h2>Total Orders</h2>
          <p>{dashboard.total_orders}</p>
        </DashboardCard>
        <DashboardCard>
          <h2>Total Completed Orders</h2>
          <p>{dashboard.total_completed_orders}</p>
        </DashboardCard>
        <DashboardCard>
          <h2>Total Pending Orders</h2>
          <p>{dashboard.total_pending_orders}</p>
        </DashboardCard>
        <DashboardCard>
          <h2>Total Revenue</h2>
          <p>{dashboard.total_revenue}</p>
        </DashboardCard>
        </div>

    </div>
  )
}
