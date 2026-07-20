'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderById } from "@/services/orderService";
import { Order } from "@/types/order";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Boxes,
  CreditCard,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";

export default function ViewOrder() {
  const [order, setOrder] = useState<Order | null>(null);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await getOrderById(id);
        if (response) {
          setOrder(response);
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching order", error);
      }
    };

    getOrder();
  }, [id]);

  if (!order) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl animate-pulse">
          <div className="mb-6 h-10 w-40 rounded-xl bg-slate-200" />
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6 sm:p-8">
              <div className="mb-4 h-6 w-32 rounded-lg bg-slate-200" />
              <div className="h-10 w-72 rounded-lg bg-slate-200" />
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-2xl bg-slate-100 p-5">
                  <div className="mb-3 h-4 w-24 rounded bg-slate-200" />
                  <div className="h-6 w-32 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const statusClasses =
    order.status === "completed"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
      : order.status === "processing"
      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
      : order.status === "shipped"
      ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
      : order.status === "cancelled"
      ? "bg-red-50 text-red-700 ring-1 ring-red-200"
      : "bg-amber-50 text-amber-700 ring-1 ring-amber-200";

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 px-6 py-8 text-white sm:px-8 lg:px-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <ShoppingBag size={24} />
                </div>

                <p className="text-sm font-medium text-blue-100">
                  Order Details
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {order.product_name}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
                  Review the full order information including customer details,
                  quantity, pricing, and current status.
                </p>
              </div>

              <div>
                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold capitalize ${statusClasses}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <Package size={18} />
                <p className="text-sm font-medium">Product Name</p>
              </div>
              <h2 className="text-lg font-semibold text-slate-800">
                {order.product_name}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <UserRound size={18} />
                <p className="text-sm font-medium">Customer</p>
              </div>
              <h2 className="text-lg font-semibold text-slate-800">
                {order.customer_name || "Unknown Customer"}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <BadgeCheck size={18} />
                <p className="text-sm font-medium">Status</p>
              </div>
              <h2 className="text-lg font-semibold capitalize text-slate-800">
                {order.status}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <Boxes size={18} />
                <p className="text-sm font-medium">Quantity</p>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {order.quantity}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <CreditCard size={18} />
                <p className="text-sm font-medium">Price</p>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                ₹ {order.price}
              </h2>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-blue-600">
                <ShoppingBag size={18} />
                <p className="text-sm font-medium">Total Price</p>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                ₹ {order.total_price}
              </h2>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/orders/edit/${order.id}`}
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Edit Order
              </Link>

              <Link
                href="/orders"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
              >
                Go to Orders List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}