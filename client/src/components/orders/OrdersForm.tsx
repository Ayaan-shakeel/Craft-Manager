import React from "react";
import { Package, Hash, IndianRupee, UserCircle2 } from "lucide-react";
import { Customer } from "@/types/customer";
import { OrderData } from "@/types/order";

interface OrderFormProps {
  customers: Customer[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: OrderData;
  setFormData: React.Dispatch<React.SetStateAction<OrderData>>;
  editing?: boolean;
}

export default function OrdersForm({
  customers,
  handleSubmit,
  formData,
  setFormData,
  editing,
}: OrderFormProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-slate-100 px-3 py-4 sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] lg:grid-cols-2">
          
          <div className="flex flex-col justify-center bg-gradient-to-br from-blue-600 to-sky-500 px-5 py-8 text-white sm:px-8 lg:px-10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Package size={24} />
            </div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {editing ? "Update Order" : "Create Order"}
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-blue-50 sm:text-base">
              {editing
                ? "Update order details in a clean and responsive layout."
                : "Create a new order with product, quantity, price, and customer details."}
            </p>
          </div>

          <div className="bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              <div>
                <label
                  htmlFor="product_name"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Product Name
                </label>
                <div className="relative">
                  <Package
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="product_name"
                    type="text"
                    placeholder="Product name"
                    value={formData.product_name}
                    onChange={(e) =>
                      setFormData({ ...formData, product_name: e.target.value })
                    }
                    required
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Quantity
                  </label>
                  <div className="relative">
                    <Hash
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="quantity"
                      type="number"
                      min={1}
                      placeholder="Quantity"
                      value={formData.quantity === 0 ? "" : formData.quantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quantity: e.target.value === "" ? 0 : Number(e.target.value),
                        })
                      }
                      required
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Price
                  </label>
                  <div className="relative">
                    <IndianRupee
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="price"
                      type="number"
                      min={0}
                      placeholder="Price"
                      value={formData.price === 0 ? "" : formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: e.target.value === "" ? 0 : Number(e.target.value),
                        })
                      }
                      required
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="customer_id"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Customer
                </label>
                <div className="relative">
                  <UserCircle2
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    id="customer_id"
                    value={formData.customer_id ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customer_id: e.target.value ? Number(e.target.value):0,
                      })
                    }
                    className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => {
                      return (
                        <option key={customer.id} value={customer.id}>
                          {customer.customer_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-md shadow-blue-200/70 transition hover:bg-blue-700 active:scale-[0.99]"
              >
                <Package size={18} />
                {editing ? "Update Order" : "Create Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}