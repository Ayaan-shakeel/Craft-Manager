import React from 'react'
import {Customer} from "@/types/customer"
import { Pencil, Trash2 } from "lucide-react";
interface CustomerRowProps{
    deleteCustomer:(id:string | number)=>void;
    editCustomer:(customer:Customer)=>void;
    customer:Customer;
    index:number

}
export default function CustomerRow({editCustomer,deleteCustomer,customer,index}:CustomerRowProps
) {

  return (
              <tr className="overflow-hidden rounded-2xl bg-slate-50 shadow-sm transition hover:bg-slate-100/80">
      <td className="rounded-l-2xl px-4 py-5 align-top text-sm font-semibold text-slate-700">
        {index + 1}
      </td>

      <td className="px-4 py-5 align-top">
        <p className="text-sm font-semibold text-slate-800">
          {customer.customer_name}
        </p>
      </td>

      <td className="px-4 py-5 align-top">
        <p className="max-w-55 wrap-break-words text-sm text-slate-600">
          {customer.customer_email}
        </p>
      </td>

      <td className="px-4 py-5 align-top">
        <p className="whitespace-nowrap text-sm text-slate-600">
          {customer.phone}
        </p>
      </td>

      <td className="px-4 py-5 align-top">
        <p className="max-w-55 wrap-break-words text-sm leading-6 text-slate-600">
          {customer.address}
        </p>
      </td>

      <td className="px-4 py-5 align-top">
        <p className="max-w-65 wrap-break-words text-sm leading-6 text-slate-600">
          {customer.notes || "No additional note"}
        </p>
      </td>

      <td className="px-4 py-5 align-top text-center">
        <button
          onClick={() => deleteCustomer(customer.id)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={18} />
        </button>
      </td>

      <td className="rounded-r-2xl px-4 py-5 align-top text-center">
        <button
          onClick={() => editCustomer(customer)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-100"
        >
          <Pencil size={18} />
        </button>
      </td>
    </tr>
  )
}
