'use client';
import OrdersForm from '@/components/orders/OrdersForm'
import { getCustomers } from '@/services/customerService'
import React ,{useEffect,useState} from 'react'
import { Customer } from '@/types/customer' 
import {createOrder} from "@/services/orderService"
export default function CreateOrders() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [formData,setFormData]=useState({
    product_name:"",
    quantity:0,
    price:0,
    customer_id:null
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
        }
      }
      fetchCustomers()
    }, [])
  const create_order=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(formData.customer_id===null){
      alert("Please select an customer first")
      return
    }
    try{
      const order=await createOrder(formData)
      if(order){
        alert("ORder created successfully")
        console.log(order)   
      }
    }catch(error){
      alert(error)
      console.error(error)
    }
  }
  return (
    <div>
      <h1>
        Create Orders Page
        </h1>
<OrdersForm customers={customers} createOrder={create_order} formData={formData} setFormData={setFormData}/>
    </div>
  )
}
