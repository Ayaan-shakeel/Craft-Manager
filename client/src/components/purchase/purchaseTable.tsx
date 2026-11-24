"use client";

import React from "react";
import { Search, ShoppingCart, Eye } from "lucide-react";
import { Purchase } from "@/types/purchase";

interface PurchaseTableProps {
    purchases: Purchase[];
    loading: boolean;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    onView: (purchase: Purchase) => void;
}

export default function PurchaseTable({
    purchases,
    loading,
    search,
    setSearch,
    onView,
}: PurchaseTableProps) {

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-slate-200 p-5">
                <h2 className="font-bold text-slate-800">
                    Purchase History
                </h2>
            </div>

            {/* Search */}
            <div className="border-b border-slate-100 p-4">
                <div className="relative">

                    <Search
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search purchases..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                    />

                </div>
            </div>

            {/* Table Content */}
            {loading ? (

                <div className="p-10 text-center text-slate-500">
                    Loading purchases...
                </div>

            ) : purchases.length === 0 ? (

                <div className="p-12 text-center">

                    <ShoppingCart
                        size={42}
                        className="mx-auto mb-4 text-slate-300"
                    />

                    <h3 className="font-semibold text-slate-700">
                        No purchases found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Your purchase history will appear here.
                    </p>

                </div>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                        <thead className="bg-slate-50">

                            <tr>
                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Purchase Number
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Supplier ID
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Date
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Amount
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Action
                                </th>
                            </tr>

                        </thead>

                        <tbody className="divide-y divide-slate-100">

                            {purchases.map((purchase) => (

                                <tr
                                    key={purchase.id}
                                    className="transition hover:bg-slate-50"
                                >

                                    <td className="px-5 py-4 font-semibold text-slate-800">
                                        {purchase.purchase_number}
                                    </td>

                                    <td className="px-5 py-4 text-slate-600">
                                        #{purchase.supplier_id}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600">
                                        {new Date(purchase.created_at).toLocaleDateString("en-IN")}
                                    </td>

                                    <td className="px-5 py-4 font-semibold text-slate-800">
                                        ₹{Number(purchase.total_amount).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>

                                    <td className="px-5 py-4">

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            {purchase.status}
                                        </span>

                                    </td>

                                    <td className="px-5 py-4 text-center">

                                        <button
                                            onClick={() => onView(purchase)}
                                            title="View purchase"
                                            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                                        >
                                            <Eye size={18} />
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}