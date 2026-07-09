import React from 'react'
import {Customer} from "@/types/customer";
import CustomerRow from './CustomerRow';
interface CustomerTableProps{
    customers:Customer[];
    deleteCustomer:(id:string | number)=>void;
    editCustomer:(customer:Customer)=>void;
}
export default function CustomerTable({customers,deleteCustomer,editCustomer}:CustomerTableProps) {
  return (
    <div>
        <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>SR no</th>
            <th>Name</th>
            <th>Email</th>
            <th>phone</th>
            <th>Address</th>
            <th>Note</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {customers?.map((customer, index) => (
                   <CustomerRow
                   key={customer.id}
                   customer={customer}
                   index={index}
                   deleteCustomer={deleteCustomer}
                   editCustomer={editCustomer}
                   />
                   ))}
        </tbody>
      </table>

    </div>
  )
}
