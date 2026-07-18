import React from "react";

export default function DashboardCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-slate-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      {children}
    </div>
  );
}