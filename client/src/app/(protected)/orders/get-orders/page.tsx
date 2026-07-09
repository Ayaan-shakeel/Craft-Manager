'use client'
import React,{useState ,useEffect} from 'react'
import {getOrders} from "@/services/orderService"
export default function GetOrders() {
     const [orders,setOrders]=useState([])
      useEffect(()=>{
        const fetchOrders=async()=>{
          try{
  
            const order=await getOrders()
            if(order){
              setOrders(order.orders)
              console.log("Orders data:",order.orders)
          }
        }catch(error){
          console.error("Error fetching Orders:",error)
        }
        }
        fetchOrders()
      },[])
  return (
    <div>
       {orders.map((order,index)=>(
        <div key={index}>
            <div>
            {order.product_name}
            </div>
            <div>
                {order.price}
                </div>
            <div>
                {order.quantity}
                </div>
            <div>
                {order.customer.customer_name}
                </div>
        </div>
       ))} 
    </div>
  )
}
