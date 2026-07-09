import React from 'react'
import {Customer} from "@/types/customer"
interface CustomerRowProps{
    deleteCustomer:(id:string | number)=>void;
    editCustomer:(customer:Customer)=>void;
    customer:Customer;
    index:number

}
export default function CustomerRow({editCustomer,deleteCustomer,customer,index}:CustomerRowProps
) {

  return (
              <tr key={index}>
              <td>{index + 1}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.customer_email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>{customer.notes}</td>
              <td>
                <button
                className="bg-red-500 text-white p-3 rounded-lg mt-5 font-semibold hover:bg-red-600"
              onClick={()=>deleteCustomer(customer.id)}
                >
                  Delete
                </button>
                </td>
              <td>
                <button
                className="bg-blue-500 text-white p-3 rounded-lg mt-5 font-semibold hover:bg-blue-600"
                onClick={()=>editCustomer(customer)}
                >
                  Edit
                </button>
                </td>
            </tr>
  )
}
