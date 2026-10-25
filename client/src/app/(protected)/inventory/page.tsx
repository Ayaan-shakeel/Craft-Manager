"use client";

import React from "react";
import Link from "next/link";
import { PackageSearch, Plus, Eye, ArrowRight } from "lucide-react";

export default function InventoryPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
            <PackageSearch size={18} />
            <span>Craft Manager / Inventory</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Inventory Management
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Create new products, track stock, and manage pricing from one
            place.
          </p>
        </div>

        {/* Banner */}
        <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 p-6 text-white shadow-lg sm:mb-8 sm:p-8">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-300 sm:text-sm">
              Inventory Workspace
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              What would you like to do today?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Add a new product or browse and manage your existing inventory.
            </p>
          </div>

          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-blue-500/10" />
          <div className="absolute -bottom-28 right-24 h-64 w-64 rounded-full bg-orange-500/10" />
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Create Inventory */}
          <Link
            href="/inventory/create-inventory"
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Plus size={28} />
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                Create
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Create Inventory
            </h2>

            <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
              Add a new product with details like name, SKU, category, pricing,
              and stock.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition group-hover:bg-blue-700">
              Create Inventory
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* View Inventory */}
          <Link
            href="/inventory/get-inventory"
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Eye size={28} />
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                Manage
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              View Inventory
            </h2>

            <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
              Browse all inventory items, search by product or SKU, and inspect
              details.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-slate-200 transition group-hover:bg-slate-800">
              View Inventory
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>
        </div>

        {/* Bottom tip */}
        <div className="mt-6 flex items-start gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-8 sm:p-6">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <PackageSearch size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              Keep your inventory organized
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Keep product and stock details up to date so you can manage your
              business more easily.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}