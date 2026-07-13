"use client"
import React,{useState,useEffect} from 'react'
import { getOrderById,updateOrder } from '@/services/orderService'
import {useParams,useRouter} from "next/navigation"
import { Customer } from '@/types/customer' 
import {getCustomers} from "@/services/customerService"
import OrdersForm from '@/components/orders/OrdersForm'
export default function Edit() {
  const params=useParams()
  const router=useRouter()
  const id=params.id as string;
    const [customers, setCustomers] = useState<Customer[]>([])
      const [formData,setFormData]=useState({
        product_name:"",
        quantity:0,
        price:0,
        customer_id:0,
        status:"pending"
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
      useEffect(()=>{
        const fetchOrder=async()=>{
          try{
  
            const response=await getOrderById(id)
            if(response){
              setFormData({

                product_name: response.product_name,
                quantity: response.quantity,
                price: response.price,
                customer_id: response.customer?.id ?? 0,
                status: response.status ?? "pending"
              }) 
              console.log(response)
        }
        }catch(error){
          console.error("Error fetching Orders:",error)
        }
        }
        fetchOrder()
      },[id])
      const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
          const order=await updateOrder(id,formData)
          if(order){
            alert("Order updated Successfully")
            router.push("/orders/get-orders")
          }
        }catch(error){
          console.error("Error updating Order",error)
          alert(error)
        }
      }
  return (
    <div>
      <OrdersForm customers={customers} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
    </div>
  )
}
