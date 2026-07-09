import React from 'react'
import {Customer, CustomerFormData} from "@/types/customer"
interface CustomerFormProps{
  formData:CustomerFormData;
  setFormData:React.Dispatch<React.SetStateAction<CustomerFormData>>;
  handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;
  editingCustomer:Customer|null;
  cancelEdit:()=>void;
}
export default function CustomerForm({formData,setFormData,handleSubmit,editingCustomer,cancelEdit}:CustomerFormProps) {
  return (
    <div>
        <div className="flex justify-center items-center bg-linear-to-r from-blue-400 to-gray-200 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-all-duration-300 hover:shadow-xl hover:scale-105 ">
          <h1 className="text-center font-bold text-3xl mb-5">{editingCustomer?"Update your Customer":"Creater your Customers"}</h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className="mt-3 block mb-2 font-semibold">
                Name
              </label>
              <input
                className="w-full p-3 rounded-lg border"
                type="text"
                placeholder="Enter your name"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-4">
              <label className="mt-3 block mb-2 font-semibold">
                Email
              </label>
              <input
                className="w-full p-3 rounded-lg border"
                type="email"
                placeholder="Enter Email"
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-4">
              <label className="mt-3 block mb-2 font-semibold">
                Phone
              </label>
              <input
                className="w-full p-3 rounded-lg border"
                type="tel"
                placeholder="Enter Contact NO"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-4">
              <label className="mt-3 block mb-2 font-semibold">
                Address
              </label>
              <input
                className="w-full p-3 rounded-lg border"
                type="text"
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
            <div className="space-y-4">
              <label className="mt-3 block mb-2 font-semibold">
                Note
              </label>
              <textarea
                className="w-full p-3 rounded-lg border"
                placeholder="Any additional Note"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={5}

              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg mt-5 font-semibold hover:bg-blue-600"
            >
              {editingCustomer?"Update Customer":"Add Customer"}
            </button>
            {editingCustomer &&

              <button
              type="button"
              onClick={cancelEdit}

              className="w-full bg-gray-400 text-white p-3 rounded-lg mt-5 font-semibold hover:bg-slate-600"
              >
              Cancel
            </button>
            }

          </form>
        </div>
      </div>
    </div>
  )
}