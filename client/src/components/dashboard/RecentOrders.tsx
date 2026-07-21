'use client'
import React from 'react'
import {
    PackageSearch,
} from "lucide-react";
interface RecentOrdersProps {
    data: {
        id: number,
        product_name: string,
        customer_name: string,
        status: string,
        total_price: number,
        created_at: string
    }[];
}
export default function RecentOrders({ data }: RecentOrdersProps) {
    return (

        <div className="w-full">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-4 py-5 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <PackageSearch size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">
                                Recent Orders
                            </h2>
                            <p className="text-sm text-slate-500">
                                Here are the recent orders you have made.
                            </p>
                        </div>
                    </div>
                </div>

                {!data || data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <PackageSearch size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            No Orders Yet
                        </h3>
                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                            Your recent orders will appear here once you place or receive new orders.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Small devices - cards */}
                        <div className="space-y-4 p-4 sm:p-6 lg:hidden">
                            {data.map((order, index) => {
                                const statusClasses =
                                    order.status === "completed"
                                        ? "bg-emerald-50 text-emerald-700"
                                        : order.status === "processing"
                                            ? "bg-blue-50 text-blue-700"
                                            : order.status === "cancelled"
                                                ? "bg-red-50 text-red-700"
                                                : "bg-amber-50 text-amber-700";

                                return (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
                                    >
                                        <div className="mb-4 flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                    Order #{index + 1}
                                                </p>
                                                <h3 className="truncate text-base font-semibold text-slate-800">
                                                    {order.product_name}
                                                </h3>
                                                <p className="truncate text-sm text-slate-500">
                                                    {order.customer_name}
                                                </p>
                                            </div>

                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize whitespace-nowrap ${statusClasses}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-xl bg-white p-3">
                                                <p className="text-xs font-medium text-slate-400">Total</p>
                                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                                    ₹ {order.total_price}
                                                </p>
                                            </div>

                                            <div className="rounded-xl bg-white p-3">
                                                <p className="text-xs font-medium text-slate-400">Date</p>
                                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                                    {new Date(order.created_at).toLocaleDateString("en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Large devices - table */}
                        <div className="hidden lg:block p-6">
                            <table className="w-full table-fixed border-separate border-spacing-y-3">
                                <thead>
                                    <tr>
                                        <th className="w-[8%] px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                            S.No
                                        </th>
                                        <th className="w-[28%] px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                            Product
                                        </th>
                                        <th className="w-[24%] px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                            Customer
                                        </th>
                                        <th className="w-[16%] px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                            Status
                                        </th>
                                        <th className="w-[16%] px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                            Total
                                        </th>
                                        <th className="w-[24%] px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((order, index) => {
                                        const statusClasses =
                                            order.status === "completed"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : order.status === "processing"
                                                    ? "bg-blue-50 text-blue-700"
                                                : order.status === "shipped"
                                                    ? "bg-amber-50 text-amber-700"
                                                    : order.status === "cancelled"
                                                        ? "bg-red-50 text-red-700"
                                                        : "bg-amber-50 text-amber-700";

                                        return (
                                            <tr
                                                key={index}
                                                className="rounded-2xl bg-slate-50 shadow-sm  hover:shadow-md hover:scale-[1.01] transition-all duration-200"
                                            >
                                                <td className="rounded-l-2xl px-2 py-4 text-sm font-semibold text-slate-700">
                                                    {index + 1}
                                                </td>

                                                <td className="px-2 py-4">
                                                    <p className="truncate text-sm font-semibold text-slate-800">
                                                        {order.product_name}
                                                    </p>
                                                </td>

                                                <td className="px-2 py-4">
                                                    <p className="truncate text-sm text-slate-600">
                                                        {order.customer_name}
                                                    </p>
                                                </td>

                                                <td className="px-2 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3  py-1 text-xs font-semibold capitalize whitespace-nowrap ${statusClasses}`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-semibold text-slate-800 whitespace-nowrap">
                                                    ₹ {order.total_price}
                                                </td>

                                                <td className="rounded-r-2xl px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                                                    {new Date(order.created_at).toLocaleDateString("en-IN",{
                                                        day:"2-digit",
                                                        month:"short",
                                                        year:"numeric",
                                                    })}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
