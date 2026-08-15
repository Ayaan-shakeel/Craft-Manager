'use client';
import { useEffect, useState } from "react";
import { createInventory } from "@/services/inventoryService";
import { Inventory, InventoryUpdateData } from "@/types/inventory";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React from 'react'
import InventoryForm from "@/components/inventory/InventoryForm";
export default function CreateInventory() {
    const router=useRouter()
    const [inventory,setInventory]=useState<InventoryUpdateData>({ 
        product_name:"",
        quantity:0,
        cost_price:0,
        selling_price:0,
        sku:"",
        category:"",
        
    })
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        try{
            const response=await createInventory(inventory)
            if(response){
                toast.success("Inventory Added Successfully")
                router.push("/inventory/get-inventory")
            }
        }catch(error){
            toast.error("Error Adding Inventory")
            console.error("Error Adding Inventory",error)
        }
    }
  return (
    <div>
         <InventoryForm inventory={inventory} setInventory={setInventory} handleSubmit={handleSubmit}/>
    </div>
  )
}          
    
