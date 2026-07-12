import React from 'react'
import {Customer} from "@/types/customer"
import {OrderData} from "@/types/order"
interface OrderFormProps{
    customers:Customer[];
    handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;
    formData:OrderData;
setFormData:React.Dispatch<React.SetStateAction<OrderData>>;
editing?:boolean;
    
} 
export default function OrdersForm({customers,handleSubmit,formData,setFormData,editing}:OrderFormProps) {
  return (
    <div>
        <div>
            <h2>{editing ? "Update Order" : "Create Order"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name</label>
                    <input
                     type="text"
                      placeholder="Product Name"
                      value={formData.product_name}
                      onChange={(e)=>setFormData({...formData,product_name:e.target.value})}
                      required
                      />

                </div>
                <div>
                    <label>Quantity</label>
                    <input
                    type="number"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={(e)=>setFormData({...formData,quantity:e.target.value ===  "" ? 0 :  Number(e.target.value)})}
                    required
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                    type="number"
                    placeholder="price"
                    value={formData.price}
                    onChange={(e)=>setFormData({...formData,price:e.target.value === "" ? 0 : Number(e.target.value)})}
                    required
                    />
                </div>
                <div>
                    <label>Customer</label>
                    <select name="" id="" value={formData.customer_id ?? ""} onChange={(e)=>setFormData({...formData,customer_id:e.target.value ? Number(e.target.value): null})}>
                        <option value="">Select Customer</option>
                        {customers.map((customer,index)=>{
                            return <option key={customer.id} 
                            value={customer.id}>
                           {customer.customer_name}
                          </option>
                        })}
                       
                    </select>
                </div>
                <button type="submit">{editing ? "Update Order" : "Create Order"}</button>
            </form>
        </div>
    </div>
  )
}
