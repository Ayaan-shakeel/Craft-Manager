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
    const [selectedItem, setSelectedItem] = useState<Inventory | null>(null)
    const [quantity, setQuantity] = useState(1)
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
            if(!selectedItem)
                return
            

            const existingItems = JSON.parse(
                sessionStorage.getItem("orderItems") || "[]"
            );
            const existingItem = existingItems.find(
                (item: any) => item.inventory_id === selectedItem.id
            );
            if(existingItem){
                const newQuantity = existingItem.quantity + quantity;
                if(newQuantity > selectedItem.quantity) {
                    alert("Quantity exceeds available stock");
                    return;
            }
                existingItem.quantity = newQuantity;
                existingItem.total_price = existingItem.quantity * existingItem.selling_price;
            } else{
                existingItems.push({
                    inventory_id: selectedItem.id,
                    product_name: selectedItem.product_name,
                    quantity: quantity,
                    unit_price: selectedItem.selling_price,
                    total_price: selectedItem.selling_price * quantity,
                    available_stock: selectedItem.quantity,
                })
            }
                sessionStorage.setItem("orderItems", JSON.stringify(existingItems));
            setSelectedItem(null);

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
            <InventoryTable inventory={inventory} stats={stats} onAddToOrder={handleAddToOrder} selectedItem={selectedItem} setSelectedItem={setSelectedItem} quantity={quantity} setQuantity={setQuantity} />
             </div>
    </div>
  )
}
