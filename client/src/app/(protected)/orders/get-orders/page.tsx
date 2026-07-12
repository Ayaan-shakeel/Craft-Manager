'use client'
import React,{useState ,useEffect} from 'react'
import {getOrders,updateOrder} from "@/services/orderService"
import { Order} from "@/types/order"
import  Link  from 'next/link'
export default function GetOrders() {
     const [orders,setOrders]=useState<Order[]>([])
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
      // const update_order=async(id:string | number)=>{
      //   try{
      //     const order=await updateOrder(id,formData)
      //     if(order){
      //       alert("Order updated Successfully")
      //     }

      //   }catch(error){}
      // }
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
                <div> 
                  <Link
                  href={`/orders/edit/${order.id}`}>
                    Edit
                  </Link>
                  </div>
        </div>
       ))} 
    </div>
  )
}
