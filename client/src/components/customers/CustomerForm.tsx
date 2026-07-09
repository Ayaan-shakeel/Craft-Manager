import React from 'react'
import {Customer, CustomerFormData} from "@/types/customer"
import { UserPlus, PencilLine } from "lucide-react";
interface CustomerFormProps{
  formData:CustomerFormData;
  setFormData:React.Dispatch<React.SetStateAction<CustomerFormData>>;
  handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;
  editingCustomer:Customer|null;
  cancelEdit:()=>void;
}
export default function CustomerForm({formData,setFormData,handleSubmit,editingCustomer,cancelEdit}:CustomerFormProps) {
  return (

<div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-slate-100 px-3 py-4 sm:px-6 lg:px-8">
  <div className="mx-auto flex min-h-[100dvh] max-w-5xl items-center justify-center">
    <div className="grid w-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] lg:grid-cols-2">
      
      <div className="flex flex-col justify-center bg-gradient-to-br from-blue-600 to-sky-500 px-5 py-8 text-white sm:px-8 lg:px-10">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
          {editingCustomer ? <PencilLine size={24} /> : <UserPlus size={24} />}
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {editingCustomer ? "Update your Customer" : "Create your Customers"}
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-blue-50 sm:text-base">
          {editingCustomer
            ? "Update customer details with a clean and responsive layout."
            : "Add new customer information in a simple, modern, and device-friendly form."}
        </p>
      </div>

      <div className="bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <label
                htmlFor="customer_name"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Name
              </label>
              <input
                id="customer_name"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                type="text"
                placeholder="Enter your name"
                value={formData.customer_name}
                onChange={(e) =>
                  setFormData({ ...formData, customer_name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Phone
              </label>
              <input
                id="phone"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                type="tel"
                placeholder="Enter contact number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="customer_email"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Email
            </label>
            <input
              id="customer_email"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              type="email"
              placeholder="Enter email"
              value={formData.customer_email}
              onChange={(e) =>
                setFormData({ ...formData, customer_email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Address
            </label>
            <input
              id="address"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              type="text"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Note
            </label>
            <textarea
              id="notes"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="Any additional note"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-md shadow-blue-200/70 transition hover:bg-blue-700 active:scale-[0.99]"
            >
              {editingCustomer ? <PencilLine size={18} /> : <UserPlus size={18} />}
              {editingCustomer ? "Update Customer" : "Add Customer"}
            </button>

            {editingCustomer && (
              <button
                type="button"
                onClick={cancelEdit}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 active:scale-[0.99]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  </div>
</div> )
}