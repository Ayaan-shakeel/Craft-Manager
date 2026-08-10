"use client"
import React, { useEffect, useState } from 'react'
import { getInventory } from '@/services/inventoryService'
import { Inventory } from '@/types/inventory'

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
            {
                inventory.map((response,index)=>(
                    <div key={index}>
                        <div>
                        {response.product_name}
                        </div>
                        <div>
                        {response.quantity}
                        </div>
                        <div>
                        {response.cost_price}
                        </div>
                        <div>
                        {response.selling_price}
                        </div>
                        <div>
                        {response.category}
                        </div>
                        <div>
                        {response.sku}
                        </div>
                        <div>

                        {response.stock_status}
                        </div>
                        </div>


                ))
                           
            }
                        <div>
                            {stats.total_products}
                            {stats.total_stock}
                            {stats.total_cost}
                            {stats.total_value}
                            </div>
        </div>
    </div>
  )
}
