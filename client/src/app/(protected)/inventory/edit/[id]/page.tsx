"use client";
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { InventoryUpdateData } from '@/types/inventory'
import { getSingleInventory, updateInventory } from '@/services/inventoryService'
import InventoryForm from '@/components/inventory/InventoryForm';

export default function EditOrders() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string
    const [editing, setEditing] = useState(false)
    const [inventory, setInventory] = useState<InventoryUpdateData>({
        product_name:"",
        quantity:0,
        cost_price:0,
        selling_price:0,
        sku:"",
        category:""
    })
    useEffect(()=>{
        const fetchSingleInventory=async()=>{
            try{
                const response= await getSingleInventory(id)
                if(response){
                    setInventory({
                        product_name:response.inventory.product_name,
                        quantity:response.inventory.quantity,
                        cost_price:response.inventory.cost_price,
                        selling_price:response.inventory.selling_price,
                        sku:response.inventory.sku,
                        category:response.inventory.category,
                    })
                    console.log(response.inventory)
                }
            }catch(error){
                console.error(error)
            }

        }
        fetchSingleInventory()
    },[id])
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            const response=await updateInventory(id,{...inventory}) 
            if(response){
                setEditing(false)
                router.push("/inventory/get-inventory")
            }

        }catch(error){
            console.error(error)
        }
    }
  return (

    <div>
        <InventoryForm handleSubmit={handleSubmit} inventory={inventory} setInventory={setInventory} editing={editing} />
    </div>
  )
}
