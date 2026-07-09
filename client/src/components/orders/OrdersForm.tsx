import React from 'react'
import {Customer} from "@/types/customer"
interface CustomerData{
    customers:Customer[];
    createOrders:(e:React.FormEvent<HTMLFormElement>)=>void;
    
} 
export default function OrdersForm({customers,createOrders}:CustomerData) {
  return (
    <div>
        <div>
            <form onSubmit={createOrders}>
                <div>
                    <label>Product Name</label>
                    <input
                     type="text"
                      placeholder="Product Name"
                      />

                </div>
                <div>
                    <label>Quantity</label>
                    <input
                    type="number"
                    placeholder="Quantity"
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                    type="number"
                    placeholder="price"
                    />
                </div>
                <div>
                    <label>Customer</label>
                    <select name="" id="">
                        <option value="">Select Customer</option>
                        {customers.map((customer,index)=>{
                            return <option key={index} 
                            value={customer.id}>
                           {customer.customer_name}
                          </option>
                        })}
                       
                    </select>
                </div>
                <button type="submit">Create Order</button>
            </form>
        </div>
    </div>
  )
}
