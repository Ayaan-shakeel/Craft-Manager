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
  const totalPrice = Number(order.price) * Number(order.quantity);

  const statusClasses =
    order.status === "completed"
      ? "bg-emerald-50 text-emerald-700"
      : order.status === "processing"
      ? "bg-blue-50 text-blue-700"
      : order.status === "cancelled"
      ? "bg-red-50 text-red-700"
      : "bg-amber-50 text-amber-700";

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Order #{index + 1}
          </p>
          <h3 className="mt-1 text-base font-semibold text-slate-800">
            {order.product_name}
          </h3>
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses}`}
        >
          {order.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <User size={16} className="mt-1 text-slate-400" />
          <div>
            <p className="text-xs font-medium text-slate-400">Customer</p>
            <p className="text-sm text-slate-700">
              {order.customer_name || "Unknown Customer"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-3">
            <div className="flex items-center gap-2">
              <Hash size={15} className="text-slate-400" />
              <p className="text-xs font-medium text-slate-400">Quantity</p>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {order.quantity}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-3">
            <div className="flex items-center gap-2">
              <IndianRupee size={15} className="text-slate-400" />
              <p className="text-xs font-medium text-slate-400">Price</p>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              ₹ {order.price}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3">
          <div className="flex items-center gap-2">
            <BadgeCheck size={15} className="text-slate-400" />
            <p className="text-xs font-medium text-slate-400">Total Price</p>
          </div>
          <p className="mt-1 text-sm font-semibold text-slate-800">
            ₹ {totalPrice}
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-400">
            Update Status
          </label>
          <select
            value={order.status}
            onChange={(e) => updateStatus(order.id, e.target.value)}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

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