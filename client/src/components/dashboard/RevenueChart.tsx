"use client";

import React from 'react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
interface RevenueChartProps {
    data: {
        month: string,
        revenue: number
    }[];
}
export default function RevenueChart({ data, }: RevenueChartProps) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-6 text-xl font-bold">
                Monthly Revenue
            </h2>

            <div className="h-80">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `₹${value}`} />
                        <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
                        <Bar dataKey="revenue" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}
