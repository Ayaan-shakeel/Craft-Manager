"use client";
import React from 'react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface OrdersChartProps{
    data:{
        month:string,
        orders:number
    }[];
}
export default function OrdersChart({data,}:OrdersChartProps) {
  return (
    <div>
       

    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">
        Monthly Orders
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip/>

          <Line
            type="monotone"
            dataKey="orders"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  
    </div>
  )
}
