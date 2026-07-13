'use client';
import React,{useState,useEffect} from 'react'
import {getOrderById} from "@/services/orderService"
import { useParams } from 'next/navigation'
import {Order} from "@/types/order"
export default function ViewOrder() {
    const [order,setOrder]=useState<Order | null>(null)
    const params=useParams()
    const id=params.id as string;
    useEffect(()=>{
        const getOrder=async()=>{
            try{
                const response=await getOrderById(id)
                if(response){
                    setOrder(response)
                    console.log(response)
                }
            }catch(error){
                console.error("Error fetching order",error)
            }
        } 
        getOrder()
    },[id])
    if(!order){
        return <h1>Loading...</h1>
    }
    return (
    <div>
        <div>
            {order.product_name}
            {order.quantity}
            {order.price}
            {order.customer_name}
            {order.status}
        </div>
    </div>
  )
}
