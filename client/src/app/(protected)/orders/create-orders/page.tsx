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
    items:[],
    discount:0,
    tax:0,
    shipping_charges:0,
    other_charges:0,
    payment_status:"unpaid",
    amount_paid:0,
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
//     useEffect(()=>{
//       if(items.length > 0){
//         sessionStorage.setItem("Order Items", JSON.stringify(items))
//       }
// },[items])
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(formData.customer_id === 0){
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
        discount:formData.discount,
        tax:formData.tax,
        shipping_charges:formData.shipping_charges,
        other_charges:formData.other_charges,
        payment_status:formData.payment_status,
        amount_paid:formData.amount_paid,
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
  const taxAmount = (subTotal * formData.tax) / 100
  const totalAmount = subTotal - formData.discount + formData.other_charges + formData.shipping_charges + taxAmount
  const remainingAmount = Math.max(0, totalAmount - formData.amount_paid)
  const paymentStatus = formData.amount_paid <= 0 ? "unpaid" : formData.amount_paid >= totalAmount ? "partial" : "paid"
  const removeItem=(InventoryId:number)=>{
    setItems((prev)=>{
        const updateItems = prev.filter((item) => item.inventory_id !== InventoryId);
        if(updateItems.length === 0){
          sessionStorage.removeItem("orderItems")
        }else{
          sessionStorage.setItem("orderItems", JSON.stringify(updateItems))
        }
        return updateItems
      }
    )
  }
  const updateItemQuantity=(InventoryId:number,quantity:number)=>{
    setItems((prev)=>{

      const updateItems = prev.map((item)=>
        item.inventory_id === InventoryId 
    ? {
      ...item,
      quantity,
      total_price:item.quantity * item.unit_price,
    }
    : item
  )
  sessionStorage.setItem("orderItems", JSON.stringify(updateItems))
  return updateItems
}
)
  }
  const clearAllItems=()=>{
    if(items.length === 0){
      return;
    }
      const confirm=window.confirm("Are you sure you want to clear all items?")
      if(confirm){
        setItems([])
        sessionStorage.removeItem("orderItems")
      
    }
  }
  return (
    <div>
      <ToastContainer/>
      <h1>
        Create Orders Page
        </h1>
<OrdersForm 
customers={customers}
handleSubmit={handleSubmit}
formData={formData}
setFormData={setFormData} 
items={items} subtotal={subTotal}
removeItem={removeItem}
updateItemQuantity={updateItemQuantity}
clearAllItems={clearAllItems}
totalAmount={totalAmount}
remainingAmount={remainingAmount}
paymentStatus={paymentStatus}
/>
    <ToastContainer/>
    </div>
  )
}
