import { MapPin, Mail, Phone, FileText, Pencil, Trash2, User } from "lucide-react";
import {Customer} from "@/types/customer"
interface CustomerCardProps{
    deleteCustomer:(id:string | number)=>void;
    editCustomer:(customer:Customer)=>void;
    customer:Customer;
    index:number

}
export default function CustomerCard({ customer, index, deleteCustomer, editCustomer }:CustomerCardProps){
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <User size={18} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Customer #{index + 1}
            </p>
            <h3 className="text-base font-semibold text-slate-800">
              {customer.customer_name}
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Mail size={16} className="mt-1 text-slate-400" />
          <div>
            <p className="text-xs font-medium text-slate-400">Email</p>
            <p className="break-words text-sm text-slate-700">
              {customer.customer_email}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone size={16} className="mt-1 text-slate-400" />
          <div>
            <p className="text-xs font-medium text-slate-400">Phone</p>
            <p className="text-sm text-slate-700">
              {customer.phone}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin size={16} className="mt-1 text-slate-400" />
          <div>
            <p className="text-xs font-medium text-slate-400">Address</p>
            <p className="text-sm leading-6 text-slate-700">
              {customer.address}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FileText size={16} className="mt-1 text-slate-400" />
          <div>
            <p className="text-xs font-medium text-slate-400">Note</p>
            <p className="text-sm leading-6 text-slate-700">
              {customer.notes || "No additional note"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={() => editCustomer(customer)}
          className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-blue-50 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => deleteCustomer(customer.id)}
          className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-red-50 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};