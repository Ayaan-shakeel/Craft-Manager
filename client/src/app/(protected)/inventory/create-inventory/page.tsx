"use client";
import { useEffect, useState } from "react";
import { createInventory } from "@/services/inventoryService";
import { Inventory } from "@/types/inventory";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React from 'react'
import { parseAnimateLayoutArgs } from "framer-motion";

export default function page() {
    const router=useRouter()
    const [inventory,setInventory]=useState<Inventory>({
        id:0,
        product_name:"",
        quantity:0,
        cost_price:0,
        selling_price:0,
        sku:"",
        category:"",
        stock_status:""
    })
    const handleSubmit=async()=>{
        try{
            const response=await createInventory(inventory)
            if(response){
                toast.success("Inventory Added Successfully")
                router.push("/inventory")
            }
        }catch(error){
            toast.error("Error Adding Inventory")
            console.error("Error Adding Inventory",error)
        }
    }
  return (
    <div>
        <h1>Create Inventory</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="product_name">Product Name</label>
                <input
                    type="text"
                    name="product_name"
                    id="product_name"
                    value={inventory.product_name}
                    onChange={(e)=>setInventory({...inventory,product_name:e.target.value})}
                    required
                    />
            </div>
            <div>
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    value={inventory.quantity}
                    onChange={(e)=>setInventory({...inventory,quantity:parseInt(e.target.value)})}
                    required
                    />
            </div>
            <div>
                <label htmlFor="cost_price">Cost Price</label>
                <input
                    type="text"
                    name="cost_price"
                    id="cost_price"
                    value={inventory.cost_price}
                    onChange={(e)=>setInventory({...inventory,cost_price:parseInt(e.target.value)})}
                    required
                    />
            </div>
            <div>
                <label htmlFor="selling_price">Selling Price</label>
                <input
                    type="text"
                    name="selling_price"
                    id="selling_price"
                    value={inventory.selling_price}
                    onChange={(e)=>setInventory({...inventory,selling_price:parseInt(e.target.value)})}
                    required
                    />
            </div>
            <div>
                <label htmlFor="sku">SKU</label>
                <input
                    type="text"
                    name="sku"
                    id="sku"
                    value={inventory.sku}
                    onChange={(e)=>setInventory({...inventory,sku:e.target.value})}
                    required
                    />
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    name="category"
                    id="category"
                    value={inventory.category}
                    onChange={(e)=>setInventory({...inventory,category:e.target.value})}
                    required
                    />
            </div>
            <div>
                <label htmlFor="stock_status">Stock Status</label>
                <input
                    type="text"
                    name="stock_status"
                    id="stock_status"
                    value={inventory.stock_status}
                    onChange={(e)=>setInventory({...inventory,stock_status:e.target.value})}
                    required
                    />
            </div>
            <button type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Submmit</button>
        </form>
    </div>
  )
}
