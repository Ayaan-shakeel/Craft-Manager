"use client"
import React, { useEffect, useState } from 'react'
import { getInventory } from '@/services/inventoryService'
import { Inventory } from '@/types/inventory'
import InventoryTable from '@/components/inventory/InventoryTable'
import { useSearchParams, useRouter } from 'next/navigation'

export default function GetInventory() {
    const searchParams =  useSearchParams();
    const router = useRouter();
    const selectedForOrder = searchParams.get("selectForOrder") === "true";
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

        const handleAddToOrder = (item : Inventory)=>{
            const existingItems = JSON.parse(
                sessionStorage.getItem("orderItems") || "[]"
            );
            const existingItem = existingItems.find(
                (orderItem: any) => orderItem.inventory_id === item.id
            );
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.total_price = existingItem.quantity * existingItem.selling_price;
            } else{
                existingItems.push({
                    inventory_id: item.id,
                    product_name: item.product_name,
                    quantity: 1,
                    unit_price: item.selling_price,
                    total_price: item.selling_price,
                    avilable_stock: item.quantity,
                })
            }
                sessionStorage.setItem("orderItems", JSON.stringify(existingItems));
            

            console.log("Selected Inventory Item")
            router.push("/orders/create-orders")
        }
  return (
    <div>
        <h1>Inventory</h1>
        {selectedForOrder && (
            <p>Select products to add your order</p>
        ) 
        }
        <div>
            <InventoryTable inventory={inventory} stats={stats} onAddToOrder={handleAddToOrder} />
             </div>
    </div>
  )
}
