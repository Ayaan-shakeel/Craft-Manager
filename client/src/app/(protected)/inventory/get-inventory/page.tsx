"use client"
import React, { useEffect, useState } from 'react'
import { getInventory } from '@/services/inventoryService'
import { Inventory } from '@/types/inventory'

export default function GetInventory() {
    const [inventory, setInventory] = useState<Inventory[]>([])
    useEffect(()=>{
        const fetchInventory=async()=>{
        try{
           const response=await getInventory()
           if(response){
               setInventory(response.inventory)
               console.log(response)

           }
            }catch(error){
                console.log(error)
            }
        }
        fetchInventory()
        },[])
  return (
    <div>
        <h1>Inventory</h1>
        <div>
            {
                inventory.map((response,index)=>(
                    <div key={index}>
                        {response.product_name}
                        {response.quantity}
                        {response.cost_price}
                        {response.selling_price}
                        {response.category}
                        {response.sku}
                        </div>
                ))
            }
        </div>
    </div>
  )
}
