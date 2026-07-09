import React from 'react'
import {Customer} from "@/types/customer";
import CustomerRow from './CustomerRow';
import { Users } from "lucide-react";
import CustomerCard from './CustomerCard'
import EmptyCustomerState from './EmptyCustomerState'
interface CustomerTableProps{
    customers:Customer[];
    deleteCustomer:(id:string | number)=>void;
    editCustomer:(customer:Customer)=>void;
}
export default function CustomerTable({customers,deleteCustomer,editCustomer}:CustomerTableProps) {
  return (

<div className="w-full px-3 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
  <div className="mx-auto w-full max-w-7xl rounded-3xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
    
    <div className="border-b border-slate-200 px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Users size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">
            Customers
          </h2>
          <p className="text-sm text-slate-500">
            View, edit, and manage all customer records.
          </p>
        </div>
      </div>
    </div>
 <div className="lg:hidden">
    {customers?.length > 0 ? (
      <div className="space-y-4">
        {customers.map((customer, index) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            index={index}
            deleteCustomer={deleteCustomer}
            editCustomer={editCustomer}
          />
        ))}
      </div>
    ) : (
    
      <EmptyCustomerState />
    )}
  </div>

  {/* Desktop Table */}
  <div className="hidden lg:block">
   
    {customers?.length > 0 ? (
      <div className="overflow-x-auto px-3 py-4 sm:px-4 lg:px-6 lg:py-6">
        <table className="w-full min-w-[1100px] border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                SR No
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Address
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Note
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Delete
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Edit
              </th>
            </tr>
          </thead>

          <tbody>
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
    ) : (
           <EmptyCustomerState />
    )}
    </div>
  </div>
</div>
  )
}
