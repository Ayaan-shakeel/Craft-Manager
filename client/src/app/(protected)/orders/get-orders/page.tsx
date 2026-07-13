'use client'
import React,{useState ,useEffect} from 'react'
import {getOrders,updateOrderStatus,deleteOrder} from "@/services/orderService"
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
      const updateStatus=async(id:string | number,status:string)=>{
        console.log(id)
        console.log(status)
        try{
          const response=await updateOrderStatus(id,status)

          if(response){
            console.log(response)
            setOrders(prev=>prev.map(order=>order.id===id ? {...order,status}: order))
            alert("Status Updated")

          }

        }catch(error){
          alert(error)
        }
      }
      const delete_Order=async(id:string |number)=>{
        try{
          const response=await deleteOrder(id)
          if(response){
            setOrders(prev=>prev.filter(order=>order.id!==id))
            alert("Order deleted successfully")
          }
        }catch(error){
          alert(error)
        }
      }
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
                  {order.status}
                </div>
                <div> 
                  <Link
                  href={`/orders/edit/${order.id}`}>
                    Edit
                  </Link>
                  </div>
                <div> 
                  <Link
                  href={`/orders/view/${order.id}`}>
                    View
                  </Link>
                  </div>
                  <div>
                    <select value={order.status} onChange={(e)=>{
                      console.log(e.target.value)
                      updateStatus(order.id,e.target.value)}}>
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>

                      </select>
                  
                    </div>
                    <div>
                      <button onClick={()=>delete_Order(order.id)}>Delete</button>
                      </div>
        </div>
       ))} 
    </div>
  )
}
