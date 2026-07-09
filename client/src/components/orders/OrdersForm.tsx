import React from 'react'
import {Customer} from "@/types/customer"
import {OrderData} from "@/types/order"
interface OrderFormProps{
    customers:Customer[];
    createOrder:(e:React.FormEvent<HTMLFormElement>)=>void;
    formData:OrderData;
setFormData:React.Dispatch<React.SetStateAction<OrderData>>;
    
} 
export default function OrdersForm({customers,createOrder,formData,setFormData}:OrderFormProps) {
  return (
    <div>
        <div>
            <form onSubmit={createOrder}>
                <div>
                    <label>Product Name</label>
                    <input
                     type="text"
                      placeholder="Product Name"
                      value={formData.product_name}
                      onChange={(e)=>setFormData({...formData,product_name:e.target.value})}
                      />

                </div>
                <div>
                    <label>Quantity</label>
                    <input
                    type="number"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={(e)=>setFormData({...formData,quantity:parseInt(e.target.value,10)| 0})}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                    type="number"
                    placeholder="price"
                    value={formData.price}
                    onChange={(e)=>setFormData({...formData,price:Number(e.target.value)| 0})}
                    />
                </div>
                <div>
                    <label>Customer</label>
                    <select name="" id="" value={formData.customer_id ?? ""} onChange={(e)=>setFormData({...formData,customer_id:e.target.value ? Number(e.target.value): null})}>
                        <option >Select Customer</option>
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
