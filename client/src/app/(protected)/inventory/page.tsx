'use client'
import React from 'react'
import {useEffect,useState} from 'react'
import {getSingleInventory} from "@/services/inventoryService"
import { useParams } from 'next/navigation'
import { Inventory } from '@/types/inventory'
export default function Inventory() {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  
    const params = useParams();
    const id = params.id as string;
  
  useEffect(()=>{
    const getSinglealoneInventory = async() =>{
      try{
        const response = await getSingleInventory(id)
        if(response){
          setInventory(response)
        }
      }
      catch(error){
        console.error(error)
      }
    }
    getSinglealoneInventory()
  },[id])
  return (
    <div>
      {inventory?.product_name}
    </div>
  )
}
