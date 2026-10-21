"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  ClipboardList,
  ArrowRight,
  Plus,
  Package,
  TrendingUp,
} from "lucide-react";

export default function OrdersPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-orange-600">
            <Package size={18} />
            <span>Craft Manager / Orders</span>
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Orders Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Create, track, and manage your customer orders from one place.
              </p>
            </div>

            <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 sm:flex">
              <ShoppingBag size={28} />
            </div>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 p-6 text-white shadow-lg sm:mb-8 sm:p-8">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-orange-300 sm:text-sm">
              Order Workspace
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              What would you like to do today?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Create new orders, review existing ones, and keep your craft
              business organized.
            </p>
          </div>

          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-orange-500/10" />
          <div className="absolute -bottom-28 right-24 h-64 w-64 rounded-full bg-blue-500/10" />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Create Orders Card */}
          <section className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                <Plus size={28} />
              </div>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                Create
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Create New Order
            </h2>

            <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
              Add a new order, select a customer, enter product details, and
              organize your sales.
            </p>

            <button
              type="button"
              onClick={() => router.push("/orders/create-orders")}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 active:scale-[0.99] sm:w-auto"
            >
              Create Order
              <ArrowRight size={18} />
            </button>
          </section>

          {/* View Orders Card */}
          <section className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <ClipboardList size={28} />
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                Manage
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              View All Orders
            </h2>

            <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
              Browse existing orders, review customer details, and update order
              statuses.
            </p>

            <button
              type="button"
              onClick={() => router.push("/orders/get-orders")}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-slate-200 transition hover:bg-slate-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300 active:scale-[0.99] sm:w-auto"
            >
              View Orders
              <ArrowRight size={18} />
            </button>
          </section>
        </div>

        {/* Bottom Tip */}
        <div className="mt-6 flex items-start gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-8 sm:p-6">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <TrendingUp size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              Keep your business organized
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Keep customer and order information up to date so you can track
              your work more easily.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}