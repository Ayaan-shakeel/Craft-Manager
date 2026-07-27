'use client';
import OrdersForm from '@/components/orders/OrdersForm'
import { getCustomers } from '@/services/customerService'
import React ,{useEffect,useState} from 'react'
import { Customer } from '@/types/customer' 
import {createOrder} from "@/services/orderService"
import {OrderData} from "@/types/order"
import {toast ,ToastContainer} from "react-toastify"
export default function CreateOrders() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [formData,setFormData]=useState<OrderData>({
    product_name:"",
    quantity:0,
    price:0,
    customer_id:0
  })
   useEffect(() => {
      const fetchCustomers = async () => {
        try {
          const customer = await getCustomers();
          if (customer) {
            console.log("hello")
            setCustomers(customer)
            console.log("Customers data:", customer)
  
          }
        } catch (error) {
          console.error("Error fetching customers:", error)
          toast.error("Failed to fetch Customers")
        }
      }
      fetchCustomers()
    }, [])
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(formData.customer_id===null){
      toast.success("Please select an customer first")
      return
    }
    try{
      const order=await createOrder(formData)
      if(order){
        toast.success("ORder created successfully")
        console.log(order)   
      }
    }catch(error){
      toast.error("Failed to create order")
      console.error(error)
    }
  }
  return (
    <div>
      <ToastContainer/>
      <h1>
        Create Orders Page
        </h1>
<OrdersForm customers={customers} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData}/>
    <ToastContainer/>
    </div>
  )
}
