"use client"
import React, { useEffect, useState } from 'react'
import { getInventory } from '@/services/inventoryService'
import { Inventory } from '@/types/inventory'
import InventoryTable from '@/components/inventory/InventoryTable'

export default function GetInventory() {
    const [inventory, setInventory] = useState<Inventory[]>([])
    const [stats,setStats]=useState({
        total_products:0,
        total_stock:0,
        total_cost:0,
        total_value:0
    })
    useEffect(()=>{
        const fetchInventory=async()=>{
        try{
           const response=await getInventory()
           if(response){
               setInventory(response.inventory)
               setStats(response.stats)
               console.log(response.inventory)
               console.log(response.stats)

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
            <InventoryTable inventory={inventory} stats={stats} />
             </div>
    </div>
  )
}
