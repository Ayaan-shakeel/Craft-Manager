"use client";

import React from "react";
import Link from "next/link";
import { PackageSearch, Plus, Eye, Pencil } from "lucide-react";

export default function InventoryPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Inventory
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage your products, stock, and pricing from one place.
          </p>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Create Inventory */}
          <Link
            href="/inventory/create-inventory"
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:scale-110">
              <Plus size={22} />
            </div>

            <h2 className="text-lg font-bold text-slate-800">
              Create Inventory
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add a new product with details like name, SKU, category, pricing,
              and stock.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
              Get started
              <Plus size={16} className="transition group-hover:translate-x-1" />
            </div>
          </Link>

          {/* View / Get Inventory */}
          <Link
            href="/inventory/get-inventory"
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:scale-110">
              <Eye size={22} />
            </div>

            <h2 className="text-lg font-bold text-slate-800">
              View Inventory
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Browse all inventory items, search by product or SKU, and inspect
              details.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
              Open list
              <Eye size={16} className="transition group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Optional: Get single by ID */}
          <Link
            href="/inventory/get-inventory"
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:col-span-2 lg:col-span-1"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:scale-110">
              <PackageSearch size={22} />
            </div>

            <h2 className="text-lg font-bold text-slate-800">
              Get Inventory
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Fetch a single inventory item by ID to view or edit its details.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
              Get item
              <PackageSearch size={16} className="transition group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* Optional secondary section */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <PackageSearch size={18} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800 sm:text-lg">
                  Quick actions
                </h3>
                <p className="text-sm text-slate-500">
                  Common tasks for managing inventory.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 sm:p-6">
            <Link
              href="/inventory/create-inventory"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Plus size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Add new product
                </p>
                <p className="text-xs text-slate-500">
                  Create a new inventory item
                </p>
              </div>
            </Link>

            <Link
              href="/inventory/get-inventory"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Eye size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  View all products
                </p>
                <p className="text-xs text-slate-500">
                  Browse and search inventory
                </p>
              </div>
            </Link>

            <Link
              href="/inventory/get-inventory"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100 sm:col-span-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <PackageSearch size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Get single inventory
                </p>
                <p className="text-xs text-slate-500">
                  Load one item by ID for view or edit
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}