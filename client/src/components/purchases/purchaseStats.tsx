import React from "react";
import { ShoppingCart, IndianRupee, Receipt } from "lucide-react";

interface PurchaseStatsProps {
    totalPurchases: number;
    totalSpent: number;
    totalItems: number;
}

export default function PurchaseStats({
    totalPurchases,
    totalSpent,
    totalItems,
}: PurchaseStatsProps) {

    const stats = [
        {
            title: "Total Purchases",
            value: totalPurchases,
            icon: ShoppingCart,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Total Spent",
            value: `₹${totalSpent.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
            icon: IndianRupee,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Purchase Records",
            value: totalItems,
            icon: Receipt,
            color: "bg-purple-100 text-purple-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {stats.map((stat) => {

                const Icon = stat.icon;

                return (
                    <div
                        key={stat.title}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-slate-500">
                                    {stat.title}
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-slate-800">
                                    {stat.value}
                                </h2>
                            </div>

                            <div className={`rounded-xl p-3 ${stat.color}`}>
                                <Icon size={24} />
                            </div>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}