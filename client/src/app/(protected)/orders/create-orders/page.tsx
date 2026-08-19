'use client';
import OrdersForm from '@/components/orders/OrdersForm'
import { getCustomers } from '@/services/customerService'
import React ,{useEffect,useState} from 'react'
import { Customer } from '@/types/customer' 
import {createOrder} from "@/services/orderService"
import {OrderData , OrderItem, OrderItemData} from "@/types/order"
import {toast ,ToastContainer} from "react-toastify"
import { Inventory } from '@/types/inventory'
export default function CreateOrders() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [formData,setFormData]=useState<OrderData>({
    customer_id:0,
    items:[]
  })
  const [items, setItems] = useState<OrderItem[]>([])
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
    useEffect(()=>{
      const savedItems = sessionStorage.getItem("orderItems");
      if(savedItems) {
        setItems(JSON.parse(savedItems));
      }
    },[])
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(formData.customer_id===null){
      toast.success("Please select an customer first")
      return
    }
    if(items.length===0){
      toast.success("Please select products to add to your order")
      return
    }
    try{
      const order=await createOrder({
        customer_id:formData.customer_id,
        items:items.map((item)=>({
          inventory_id: item.inventory_id,
          quantity: item.quantity,
        })),
      })
      
      if(order){
        toast.success("ORder created successfully")
        sessionStorage.removeItem("orderItems")
        // router.push("/orders/get-orders")
        console.log(order)   
      }
    }catch(error){
      toast.error("Failed to create order")
      console.error(error)
    }
  }
  const subTotal=items.reduce((total,item)=>total+(item.quantity*item.unit_price),0)
  const removeItem=(InventoryId:number)=>{
    setItems((prev)=>
    prev.filter((item) => item.inventory_id !== InventoryId))
  }
  
  return (
    <div>
      <ToastContainer/>
      <h1>
        Create Orders Page
        </h1>
<OrdersForm customers={customers} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} items={items} subtotal={subTotal} removeItem={removeItem}/>
    <ToastContainer/>
    </div>
  )
}
