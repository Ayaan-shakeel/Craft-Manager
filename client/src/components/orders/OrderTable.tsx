import React from "react";
import { PackageSearch } from "lucide-react";
import { Order } from "@/types/order";
import OrderRow from "./OrderRow";
import OrderCard from "./OrderCard";

interface OrderTableProps {
  Orders: Order[];
  deleteOrder: (id: string | number) => void;
  updateStatus: (id: string | number, status: string) => void;
}

export default function OrderTable({
  Orders,
  deleteOrder,
  updateStatus,
}: OrderTableProps) {
  return (
    <section className="w-full px-3 py-5 sm:px-5 lg:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-3xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
        <div className="border-b border-slate-200 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <PackageSearch size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">
                Orders
              </h2>
              <p className="text-sm text-slate-500">
                View, update, and manage all order records.
              </p>
            </div>
          </div>
        </div>

        {Orders?.length > 0 ? (
          <>
            {/* Mobile / Tablet Cards */}
            <div className="space-y-4 px-4 py-5 lg:hidden sm:px-6">
              {Orders.map((order, index) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  index={index}
                  deleteOrder={deleteOrder}
                  updateStatus={updateStatus}
                />
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block">
              <div className="px-3 py-4 sm:px-4 lg:px-6 lg:py-6">
                <table className="w-full table-fixed border-separate border-spacing-y-3">
               <thead>
  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
    <th className="px-3 py-3">Order</th>
    <th className="px-3 py-3">Customer</th>
    <th className="px-3 py-3">Products</th>
    <th className="px-3 py-3 text-center">Items</th>
    <th className="px-3 py-3">Subtotal</th>
    <th className="px-3 py-3">Total</th>
    <th className="px-3 py-3">Status</th>
    <th className="px-3 py-3">Update</th>
    <th className="px-3 py-3 text-center">View</th>
    <th className="px-3 py-3 text-center">Edit</th>
    <th className="px-3 py-3 text-center">Delete</th>
  </tr>
</thead>
                  <tbody>
                    {Orders.map((order, index) => (
                      <OrderRow
                        key={order.id}
                        order={order}
                        index={index}
                        deleteOrder={deleteOrder}
                        updateStatus={updateStatus}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <PackageSearch size={28} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              No orders yet
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are no order records available right now. Create your first
              order to see the data here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}