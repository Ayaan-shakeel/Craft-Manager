"use client"


import React from 'react'
import { useEffect, useState } from 'react'
import { deleteCustomer, getCustomers,updateCustomer } from "@/services/customerService"
import { createCustomer } from "@/services/customerService"
import CustomerForm from '@/components/customers/CustomerForm'
import {Customer} from "@/types/customer"
import CustomerTable from '@/components/customers/CustomerTable'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [editingCustomer,setEditingCustomer]=useState<Customer|null>(null)
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    phone: "",
    address: "",
    notes: ""
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

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
    if(editingCustomer){
      const customer=await updateCustomer(editingCustomer.id,formData)
      if(customer){
        alert("customer updated successfully")
        setCustomers(prev=>prev.map((c)=>c.id===customer.id?customer:c))
        setEditingCustomer(null)
        setFormData(emptyFormData)
       
      }
    }
    else{

        const customer = await createCustomer(formData)
      if (customer) {
        alert("customer created successfully")
        setFormData(emptyFormData)
        setCustomers((prevCustomers)=>[...prevCustomers,customer])
      }
    }
    } catch(error) {
      console.error("Error while creating it")
      alert(error)
  }
}
  
  const delete_customer=async(id:string | number)=>{
    try{
      const customer=await deleteCustomer(id)
      if(customer){
        console.log(id)
        alert("Customer deleted successfully")
        setCustomers((prevCustomers)=>prevCustomers.filter((c:Customer)=>c.id !== id))
      }
    }catch(error){
      console.error("Error while deleting Customer",error)
      alert(error)
    }
  }
  const edit_customer=(customer:Customer)=>{
    setEditingCustomer(customer)
    setFormData({
      customer_name:customer.customer_name,
      customer_email:customer.customer_email,
      phone:customer.phone,
      address:customer.address,
      notes:customer.notes
    })
    
  }
  const emptyFormData={
    customer_name: "",
    customer_email: "",
    phone: "",
    address: "",
    notes: ""

  }
  const cancelEdit=()=>{
     setEditingCustomer(null)
                 setFormData(emptyFormData)
  }
  return (
    <div>
      <CustomerForm
      formData={formData}
      setFormData={setFormData}
      editingCustomer={editingCustomer}
      handleSubmit={handleSubmit}
      cancelEdit={cancelEdit}
      />
      
     <CustomerTable customers={customers} deleteCustomer={delete_customer} editCustomer={edit_customer} />
    </div>
  )
}
