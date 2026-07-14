import React from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Order } from "@/types/order";

interface OrderRowProps {
  order: Order;
  index: number;
  deleteOrder: (id: string | number) => void;
  updateStatus: (id: string | number, status: string) => void;
}

export default function OrderRow({
  order,
  index,
  deleteOrder,
  updateStatus,
}: OrderRowProps) {
  const statusClasses =
    order.status === "completed"
      ? "bg-emerald-50 text-emerald-700"
      : order.status === "processing"
      ? "bg-blue-50 text-blue-700"
      : order.status === "cancelled"
      ? "bg-red-50 text-red-700"
      : "bg-amber-50 text-amber-700";

  return (
    <tr className="rounded-2xl bg-slate-50 shadow-sm transition hover:bg-slate-100/80">
      <td className="rounded-l-2xl px-2 py-4 align-middle text-sm font-semibold text-slate-700">
        {index + 1}
      </td>

      <td className="px-2 py-4 align-middle">
        <p className="truncate text-sm font-semibold text-slate-800">
          {order.product_name}
        </p>
      </td>

      <td className="px-2 py-4 align-middle">
        <p className="truncate text-sm text-slate-600">
          {order.customer_name || "Unknown Customer"}
        </p>
      </td>

      <td className="px-2 py-4 align-middle text-sm text-slate-600">
        {order.quantity}
      </td>

      <td className="px-2 py-4 align-middle text-sm text-slate-600 whitespace-nowrap">
        ₹ {order.price}
      </td>

      <td className="px-2 py-4 align-middle text-sm font-semibold text-slate-800 whitespace-nowrap">
        ₹ {order.total_price}
      </td>

      <td className="px-2 py-4 align-middle">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize whitespace-nowrap ${statusClasses}`}
        >
          {order.status}
        </span>
      </td>

      <td className="px-2 py-4 align-middle">
        <select
          value={order.status}
          onChange={(e) => updateStatus(order.id, e.target.value)}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white px-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </td>

      <td className="px-2 py-4 align-middle text-center">
        <Link
          href={`/orders/view/${order.id}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
        >
          <Eye size={16} />
        </Link>
      </td>

      <td className="px-2 py-4 align-middle text-center">
        <Link
          href={`/orders/edit/${order.id}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-100"
        >
          <Pencil size={16} />
        </Link>
      </td>

      <td className="rounded-r-2xl px-2 py-4 align-middle text-center">
        <button
          onClick={() => deleteOrder(order.id)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}