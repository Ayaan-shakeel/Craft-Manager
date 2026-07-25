"use client";
import React from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface OrderStatusChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#f59e0b", // Pending
  "#3b82f6", // Processing
  "#06b6d4", // Shipped
  "#22c55e", // Completed
  "#ef4444", // Cancelled
];

export default function OrderStatusChart({
  data,
}: OrderStatusChartProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Order Status
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}