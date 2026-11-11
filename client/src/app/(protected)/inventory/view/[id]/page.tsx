"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSingleInventory, getStockMovements } from "@/services/inventoryService";
import { Inventory, InventoryAnalytics, StockMovement } from "@/types/inventory";
import {
  ArrowLeft,
  Boxes,
  DollarSign,
  Hash,
  Package,
  Percent,
  ShoppingCart,
  Tag,
  TrendingUp,
  History,
  ArrowDownRight,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

export default function ViewSingleInventory() {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [analytics, setAnalytics] = useState<InventoryAnalytics | null>(null);
  const params = useParams();
  const id = params.id as string;
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [movementLoading, setMovementLoading] = useState(true);

  useEffect(() => {
    const fetchSingleInventory = async () => {
      try {
        const response = await getSingleInventory(id);
        if (response) {
          console.log(response.inventory.product_name);
          console.log(response.inventory);
          setInventory(response.inventory);
          setAnalytics(response.analytics);
          console.log(response.analytics);
        }
      } catch (error) {
        console.error("Error while fetching single inventory", error);
      }
    };
    fetchSingleInventory();
  }, [id]);

  useEffect(() => {
  const fetchStockMovements = async () => {
    try {
      setMovementLoading(true);

      const data = await getStockMovements(id);

      setMovements(data);
    } catch (error) {
      console.error("Error fetching stock movements:", error);
    } finally {
      setMovementLoading(false);
    }
  };

  if (id) {
    fetchStockMovements();
  }
}, [id]);

  if (!inventory || !analytics) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6 h-10 w-40 animate-pulse rounded-xl bg-slate-200" />
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6 sm:p-8">
              <div className="mb-4 h-6 w-32 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-10 w-72 animate-pulse rounded-lg bg-slate-200" />
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-slate-100 p-5">
                  <div className="mb-3 h-4 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }



  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6">
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to Inventory
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 px-6 py-8 text-white sm:px-8 lg:px-10">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <Boxes size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-100">
                  Product Details
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {inventory.product_name}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
                  View product information, stock details, pricing, and key
                  analytics for this inventory item.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <Hash size={18} />
                <p className="text-sm font-medium">SKU</p>
              </div>
              <h2 className="text-lg font-semibold text-slate-800">
                {inventory.sku}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <Tag size={18} />
                <p className="text-sm font-medium">Category</p>
              </div>
              <h2 className="text-lg font-semibold text-slate-800">
                {inventory.category}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <Package size={18} />
                <p className="text-sm font-medium">Stock Status</p>
              </div>
              <h2 className="text-lg font-semibold capitalize text-slate-800">
                {inventory.stock_status}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <Boxes size={18} />
                <p className="text-sm font-medium">Quantity</p>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {inventory.quantity}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <DollarSign size={18} />
                <p className="text-sm font-medium">Cost Price</p>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                ₹ {inventory.cost_price}
              </h2>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-blue-600">
                <DollarSign size={18} />
                <p className="text-sm font-medium">Selling Price</p>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                ₹ {inventory.selling_price}
              </h2>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 sm:px-8 lg:px-10">
            <h3 className="mb-4 text-lg font-bold text-slate-800">
              Analytics
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <Boxes size={16} />
                  <p className="text-xs font-medium">Current Stock</p>
                </div>
                <p className="text-xl font-bold text-slate-900">
                  {analytics.current_stock}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <DollarSign size={16} />
                  <p className="text-xs font-medium">Estimated Cost</p>
                </div>
                <p className="text-xl font-bold text-slate-900">
                  ₹ {analytics.estimated_cost}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <TrendingUp size={16} />
                  <p className="text-xs font-medium">Estimated Profit</p>
                </div>
                <p className="text-xl font-bold text-slate-900">
                  ₹ {analytics.estimated_profit}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <DollarSign size={16} />
                  <p className="text-xs font-medium">Inventory Value</p>
                </div>
                <p className="text-xl font-bold text-slate-900">
                  ₹ {analytics.inventory_value}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <ShoppingCart size={16} />
                  <p className="text-xs font-medium">Orders Count</p>
                </div>
                <p className="text-xl font-bold text-slate-900">
                  {analytics.orders_count}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <Percent size={16} />
                  <p className="text-xs font-medium">Profit Margin</p>
                </div>
                <p className="text-xl font-bold text-slate-900">
                  {analytics.profit_margin}%
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <DollarSign size={16} />
                  <p className="text-xs font-medium">Revenue</p>
                </div>
                <p className="text-xl font-bold text-slate-900">
                  ₹ {analytics.revenue}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <Hash size={16} />
                  <p className="text-xs font-medium">Units Sold</p>
                </div>
                <p className="text-xl font-bold text-slate-900">
                  {analytics.units_sold}
                </p>
              </div>
              {/* Stock Movement History */}
<div className="mt-8 border-t border-slate-200 pt-8">
  <div className="mb-6 flex items-center gap-3">
    <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
      <History size={22} />
    </div>

    <div>
      <h2 className="text-xl font-bold text-slate-800">
        Stock Movement History
      </h2>
      <p className="text-sm text-slate-500">
        Track every stock addition, deduction, and adjustment.
      </p>
    </div>
  </div>

  {movementLoading ? (
    <p className="py-6 text-center text-slate-500">
      Loading stock history...
    </p>
  ) : movements.length === 0 ? (
    <div className="rounded-2xl bg-slate-50 p-8 text-center">
      <History className="mx-auto mb-3 text-slate-400" size={32} />
      <p className="font-semibold text-slate-700">
        No stock movements yet
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Stock activity will appear here.
      </p>
    </div>
  ) : (
    <div className="space-y-4">
      {movements.map((movement) => {
        const isAddition = movement.quantity_changed > 0;

        return (
          <div
            key={movement.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <div
                className={`rounded-xl p-3 ${
                  isAddition
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {isAddition ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownRight size={20} />
                )}
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  {movement.movement_type
                    .replaceAll("_", " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {movement.reason}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {new Date(movement.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 sm:justify-end">
              <div className="text-sm text-slate-500">
                <p>Previous: {movement.previous_quantity}</p>
                <p>New: {movement.new_quantity}</p>
              </div>

              <span
                className={`min-w-20 rounded-xl px-3 py-2 text-center text-sm font-bold ${
                  isAddition
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isAddition ? "+" : ""}
                {movement.quantity_changed}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}