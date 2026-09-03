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
  Receipt,
  Truck,
  Clock,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

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
        }
      } catch (error) {
        toast.error("Failed while getting order");
        console.error("Error fetching order", error);
      }
    };

    getOrder();
  }, [id]);

    const timelineStatuses = [
    {
      key: "pending",
      label: "Order Created",
      description: "Order has been successfully created.",
      icon: Clock,
    },
    {
      key: "processing",
      label: "Processing",
      description: "Order is being processed.",
      icon: Package,
    },
    {
      key: "shipped",
      label: "Shipped",
      description: "Order has been shipped to the customer.",
      icon: Truck,
    },
    {
      key: "completed",
      label: "Completed",
      description: "Order has been completed successfully.",
      icon: BadgeCheck,
    },
  ];

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
                <div
                  key={index}
                  className="rounded-2xl bg-slate-100 p-5"
                >
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

  const statusOrder = [
    "pending",
    "processing",
    "shipped",
    "completed",
  ];

  const currentStatusIndex = statusOrder.indexOf(order.status);

  

  const statusClasses =
    order.status === "completed"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
      : order.status === "processing"
      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
      : order.status === "shipped"
      ? "bg-purple-50 text-purple-700 ring-1 ring-purple-200"
      : order.status === "cancelled"
      ? "bg-red-50 text-red-700 ring-1 ring-red-200"
      : "bg-amber-50 text-amber-700 ring-1 ring-amber-200";

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:px-6 lg:px-8">

      <ToastContainer />

      <div className="mx-auto w-full max-w-6xl">

        {/* Back */}
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

          {/* Header */}
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 px-6 py-8 text-white sm:px-8 lg:px-10">

            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

              <div>

                <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <ShoppingBag size={24} />
                </div>

                <p className="text-sm font-medium text-blue-100">
                  Order #{order.id}
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Order Details
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
                  Review customer information, products, payment details,
                  pricing, and order status.
                </p>

              </div>

              <span
                className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold capitalize ${statusClasses}`}
              >
                {order.status}
              </span>

            </div>
          </div>

          {/* Basic Information */}
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-3">

            {/* Customer */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <UserRound size={18} />
                <p className="text-sm font-medium">
                  Customer
                </p>
              </div>

              <h2 className="text-lg font-semibold text-slate-800">
                {order.customer_name || "Unknown Customer"}
              </h2>

            </div>

            {/* Items */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <Boxes size={18} />
                <p className="text-sm font-medium">
                  Total Items
                </p>
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                {order.item_count}
              </h2>

            </div>

            {/* Status */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

              <div className="mb-3 flex items-center gap-2 text-slate-500">
                <BadgeCheck size={18} />
                <p className="text-sm font-medium">
                  Status
                </p>
              </div>

              <h2 className="text-lg font-semibold capitalize text-slate-800">
                {order.status}
              </h2>

            </div>

          </div>

          {/* Products */}
          <div className="border-t border-slate-200 px-6 py-6 sm:px-8">

            <div className="mb-5 flex items-center gap-2">

              <Package size={20} className="text-blue-600" />

              <h2 className="text-xl font-bold text-slate-800">
                Ordered Products
              </h2>

            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">

              <div className="hidden grid-cols-4 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid">

                <span>Product</span>
                <span>Quantity</span>
                <span>Unit Price</span>
                <span className="text-right">Total</span>

              </div>

              <div className="divide-y divide-slate-100">

                {order.items && order.items.length > 0 ? (

                  order.items.map((item) => (

                    <div
                      key={item.id}
                      className="grid gap-3 px-5 py-4 sm:grid-cols-4 sm:items-center"
                    >

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {item.product_name}
                        </p>
                      </div>

                      <div className="text-sm text-slate-600">
                        <span className="sm:hidden font-medium">
                          Quantity:{" "}
                        </span>
                        {item.quantity}
                      </div>

                      <div className="text-sm text-slate-600">
                        <span className="sm:hidden font-medium">
                          Unit Price:{" "}
                        </span>
                        ₹ {item.unit_price.toLocaleString("en-IN")}
                      </div>

                      <div className="text-sm font-semibold text-slate-800 sm:text-right">
                        <span className="sm:hidden font-medium">
                          Total:{" "}
                        </span>
                        ₹ {item.total_price.toLocaleString("en-IN")}
                      </div>

                    </div>

                  ))

                ) : (

                  <div className="px-5 py-6 text-center text-sm text-slate-400">
                    No products found.
                  </div>

                )}

              </div>

            </div>

          </div>

                    {/* Order Timeline */}
          <div className="border-t border-slate-200 px-6 py-6 sm:px-8">

            <div className="mb-6 flex items-center gap-2">

              <Clock size={20} className="text-blue-600" />

              <h2 className="text-xl font-bold text-slate-800">
                Order Timeline
              </h2>

            </div>

            <div className="relative">

              {timelineStatuses.map((step, index) => {

                const StepIcon = step.icon;

                const isCompleted =
                  currentStatusIndex >= index &&
                  order.status !== "cancelled";

                const isCurrent =
                  currentStatusIndex === index;

                const isLast =
                  index === timelineStatuses.length - 1;

                return (
                  <div
                    key={step.key}
                    className="relative flex gap-4 pb-8 last:pb-0"
                  >

                    {/* Connecting Line */}
                    {!isLast && (
                      <div
                        className={`absolute left-[19px] top-10 h-[calc(100%-16px)] w-0.5 ${
                          currentStatusIndex > index
                            ? "bg-blue-600"
                            : "bg-slate-200"
                        }`}
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition ${
                        isCompleted
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 bg-white text-slate-400"
                      }`}
                    >
                      <StepIcon size={18} />
                    </div>

                    {/* Content */}
                    <div className="pt-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3
                          className={`font-semibold ${
                            isCompleted
                              ? "text-slate-800"
                              : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </h3>

                        {isCurrent && order.status !== "cancelled" && (
                          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 ring-1 ring-blue-200">
                            Current
                          </span>
                        )}

                      </div>

                      <p
                        className={`mt-1 text-sm ${
                          isCompleted
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        {index === 0
                          ? order.created_at
                            ? `Created on ${new Date(
                                order.created_at
                              ).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}`
                            : step.description
                          : isCompleted
                          ? step.description
                          : "Waiting for update"}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* Cancelled State */}
            {order.status === "cancelled" && (
              <div className="mt-2 rounded-2xl border border-red-200 bg-red-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <Clock size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-red-700">
                      Order Cancelled
                    </p>

                    <p className="text-sm text-red-600">
                      This order has been cancelled and is no longer active.
                    </p>
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Pricing */}
          <div className="border-t border-slate-200 px-6 py-6 sm:px-8">

            <div className="mb-5 flex items-center gap-2">

              <Receipt size={20} className="text-blue-600" />

              <h2 className="text-xl font-bold text-slate-800">
                Order Summary
              </h2>

            </div>

            <div className="ml-auto max-w-md space-y-3">

              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>
                  ₹ {order.sub_total.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Discount</span>
                <span>
                  - ₹ {order.discount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Tax</span>
                <span>
                  ₹ {order.tax.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span>
                  ₹ {(order.shipping_charges ?? 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Other Charges</span>
                <span>
                  ₹ {(order.other_charges ?? 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-4">

                <div className="flex items-center justify-between">

                  <span className="text-lg font-bold text-slate-800">
                    Total Amount
                  </span>

                  <span className="text-2xl font-bold text-blue-600">
                    ₹ {order.total_amount.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Payment */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-6 sm:px-8">

            <div className="mb-5 flex items-center gap-2">

              <CreditCard size={20} className="text-blue-600" />

              <h2 className="text-xl font-bold text-slate-800">
                Payment Information
              </h2>

            </div>

            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Payment Status
                </p>

                <p className="mt-2 text-lg font-bold capitalize text-slate-800">
                  {order.payment_status ?? "Unknown"}
                </p>

              </div>

              <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Amount Paid
                </p>

                <p className="mt-2 text-lg font-bold text-slate-800">
                  ₹ {(order.amount_paid ?? 0).toLocaleString("en-IN")}
                </p>

              </div>

              <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Remaining
                </p>

                <p className="mt-2 text-lg font-bold text-slate-800">
                  ₹{" "}
                  {(
                    order.total_amount -
                    (order.amount_paid ?? 0)
                  ).toLocaleString("en-IN")}
                </p>

              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="border-t border-slate-200 bg-white px-6 py-5 sm:px-8 lg:px-10">

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

      <ToastContainer />

    </section>
  );
}