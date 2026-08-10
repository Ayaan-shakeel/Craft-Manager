"use client";
import React from 'react'
import { useState,useEffect } from 'react'
import { getSingleInventory } from '@/services/inventoryService'
import { useParams } from 'next/navigation'
import {Inventory, InventoryAnalytics} from "@/types/inventory"
import { div } from 'framer-motion/client';
export default function ViewSingleInventory() {
    const [inventory, setInventory] = useState<Inventory | null>({
        id:0,
        product_name:"",
        quantity:0,
        cost_price:0,
        selling_price:0,
        sku:"",
        category:"",
        stock_status:""
    });
    const [response, setResponse] = useState<Inventory | null>(null);
    const [analytics, setAnalytics] = useState<InventoryAnalytics | null>({
        current_stock:0,
        estimated_cost:0,
        estimated_profit:0,
        inventory_value:0,
        orders_count:0,
        profit_margin:0,
        revenue:0,
        total_sales:0,
        units_sold:0,

    });
    const params=useParams()
    const id=params.id as string
    // const [singleInventory,setSingleInventory]=useState("")
    useEffect(()=>{
        const fetchSingleInventory=async()=>{
            try{
                const response=await getSingleInventory(id)
                if(response){
                    console.log(response.inventory.product_name)
                    console.log(response.inventory)
                    setInventory(response.inventory)
                    setAnalytics(response.analytics)
                    console.log(response.analytics)
                    // setResponse(response)

                }
            }catch(error){
                console.error("Error while fetching single inventory",error)
            }
        }
        fetchSingleInventory()
    },[id])
  return (
    <div>         
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{inventory?.product_name}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{inventory?.quantity}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{inventory?.cost_price}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{inventory?.selling_price}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{inventory?.category}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{inventory?.sku}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{inventory?.stock_status}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{analytics?.current_stock}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{analytics?.estimated_cost}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{analytics?.estimated_profit}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{analytics?.inventory_value}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{analytics?.orders_count}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{analytics?.profit_margin}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{analytics?.revenue}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{analytics?.total_sales}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <h1 className="text-2xl font-bold text-slate-800">{analytics?.units_sold}</h1>
                </div>
            </div>
            </div>

            {/* <table className="w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-slate-500 uppercase">
                            Product Name
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-slate-500 uppercase"> */}
    </div>
  )
}
