"use client";
import React from 'react'
import { useState,useEffect } from 'react'
import { getSingleInventory } from '@/services/inventoryService'
import { useParams } from 'next/navigation'
export default function ViewSingleInventory() {
    const params=useParams()
    const id=params.id as string
    const [singleInventory,setSingleInventory]=useState("")
    useEffect(()=>{
        const fetchSingleInventory=async()=>{
            try{
                const response=await getSingleInventory(id)
                if(response){
                    console.log(response)

                }
            }catch(error){
                console.error("Error while fetching single inventory",error)
            }
        }
        fetchSingleInventory()
    },[id])
  return (
    <div>
        {singleInventory.product_name}
        {singleInventory.quantity}
        {singleInventory.cost_price}
        {singleInventory.selling_price}
        {singleInventory.sku}
        {singleInventory.category}
        {singleInventory.stock_status}
    </div>
  )
}
