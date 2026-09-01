import React from "react";
import Link from "next/link";
import {
  Package,
  User,
  Hash,
  IndianRupee,
  BadgeCheck,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { Order } from "@/types/order";

interface OrderCardProps {
  order: Order;
  index: number;
  deleteOrder: (id: string | number) => void;
  updateStatus: (id: string | number, status: string) => void;
}

export default function OrderCard({
  order,
  index,
  deleteOrder,
  updateStatus,
}: OrderCardProps) {
  const statusClasses =
    order.status === "completed"
      ? "bg-emerald-50 text-emerald-700"
      : order.status === "processing"
      ? "bg-blue-50 text-blue-700"
      : order.status === "shipped"
      ? "bg-purple-50 text-purple-700"
      : order.status === "cancelled"
      ? "bg-red-50 text-red-700"
      : "bg-amber-50 text-amber-700";

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">

      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Order #{order.id}
          </p>

          <h3 className="mt-1 text-base font-semibold text-slate-800">
            {order.customer_name || "Unknown Customer"}
          </h3>
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses}`}
        >
          {order.status}
        </span>
      </div>

      {/* Customer */}
      <div className="mb-4 flex items-start gap-3">
        <User size={16} className="mt-1 text-slate-400" />

        <div>
          <p className="text-xs font-medium text-slate-400">
            Customer
          </p>

          <p className="text-sm text-slate-700">
            {order.customer_name || "Unknown Customer"}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="mb-4 rounded-2xl bg-white p-4">

        <div className="mb-3 flex items-center gap-2">
          <Package size={16} className="text-slate-400" />

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Products
          </p>
        </div>

        <div className="space-y-3">
          {order.items && order.items.length > 0 ? (
            order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-700">
                    {item.product_name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    ₹ {item.unit_price.toLocaleString("en-IN")} each
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-slate-700">
                    × {item.quantity}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    ₹ {item.total_price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              No products found
            </p>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-2 gap-3">

        {/* Items */}
        <div className="rounded-2xl bg-white p-3">
          <div className="flex items-center gap-2">
            <Hash size={15} className="text-slate-400" />

            <p className="text-xs font-medium text-slate-400">
              Items
            </p>
          </div>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {order.item_count}
          </p>
        </div>

        {/* Subtotal */}
        <div className="rounded-2xl bg-white p-3">
          <div className="flex items-center gap-2">
            <IndianRupee size={15} className="text-slate-400" />

            <p className="text-xs font-medium text-slate-400">
              Subtotal
            </p>
          </div>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            ₹ {order.sub_total.toLocaleString("en-IN")}
          </p>
        </div>

      </div>

      {/* Total */}
      <div className="mt-3 rounded-2xl bg-white p-3">

        <div className="flex items-center gap-2">
          <BadgeCheck size={15} className="text-slate-400" />

          <p className="text-xs font-medium text-slate-400">
            Total Amount
          </p>
        </div>

        <p className="mt-1 text-lg font-bold text-slate-800">
          ₹ {order.total_amount.toLocaleString("en-IN")}
        </p>

      </div>

      {/* Update Status */}
      <div className="mt-4">

        <label className="mb-1.5 block text-xs font-medium text-slate-400">
          Update Status
        </label>

        <select
          value={order.status}
          onChange={(e) =>
            updateStatus(order.id, e.target.value)
          }
          className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

      </div>

      {/* Actions */}
      <div className="mt-5 grid grid-cols-3 gap-3">

        <Link
          href={`/orders/view/${order.id}`}
          className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-100 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
        >
          <Eye size={16} />
          View
        </Link>

        <Link
          href={`/orders/edit/${order.id}`}
          className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-blue-50 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
        >
          <Pencil size={16} />
          Edit
        </Link>

        <button
          onClick={() => deleteOrder(order.id)}
          className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-red-50 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}