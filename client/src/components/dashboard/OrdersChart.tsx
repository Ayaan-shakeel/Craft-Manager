import React from 'react'
interface OrdersChartProps{
    data:{
        month:string,
        orders:number
    }[];
}
export default function OrdersChart({data,}:OrdersChartProps) {
  return (
    <div>RevenueChart</div>
  )
}
