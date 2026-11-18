import React from "react";
import { Truck, Users } from "lucide-react";

interface SupplierStatsProps {
    totalSuppliers: number;
    registeredContacts: number;
}

export default function SupplierStats({
    totalSuppliers,
    registeredContacts,
}: SupplierStatsProps) {

    const stats = [
        {
            title: "Total Suppliers",
            value: totalSuppliers,
            icon: Truck,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Registered Contacts",
            value: registeredContacts,
            icon: Users,
            color: "bg-green-100 text-green-600",
        },
    ];

    return (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

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

                                <h2 className="mt-2 text-3xl font-bold text-slate-800">
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