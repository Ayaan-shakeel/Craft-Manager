"use client";
import React from 'react'
import { useState,useEffect } from 'react'
import { getSingleInventory } from '@/services/inventoryService'
import { useParams } from 'next/navigation'
import {Inventory} from "@/types/inventory"
import { div } from 'framer-motion/client';
export default function ViewSingleInventory() {
    const [inventory, setInventory] = useState<Inventory | null>(null);
    const [response, setResponse] = useState<Inventory | null>(null);
    const params=useParams()
    const id=params.id as string
    // const [singleInventory,setSingleInventory]=useState("")
    useEffect(()=>{
        const fetchSingleInventory=async()=>{
            try{
                const response=await getSingleInventory(id)
                if(response){
                    console.log(response)
                    // setInventory(response)
                    setResponse(response)

                }
            }catch(error){
                console.error("Error while fetching single inventory",error)
            }
        }
        fetchSingleInventory()
    },[id])
  return (
    <div>
        {response.map((inventory,index)=>(
            <div key="index">

            
         {inventory.product_name}
        {inventory.quantity}
        {inventory.cost_price}
        {inventory.selling_price}
        {inventory.sku}
        {inventory.category}
        {inventory.stock_status} 
            </div>
        ))
    }
    </div>
  )
}
