// import React from 'react';
// import { Metadata } from 'next';
// export const metadata : Metadata={

// }
// export default function page() {
//    metadata.title='Home Page'
//   metadata.description='Its our Home page'
//   return (
//     <div>Home</div>
//   )
// }

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Boxes, ShoppingCart, BarChart3, Shield, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Boxes size={18} />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-800 sm:text-lg">
              Craft Manager
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              About
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Dashboard
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <Link
                href="#features"
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#about"
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <Link
                href="/login"
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 text-center ">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                <Boxes size={14} />
                Inventory + Orders Management
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Manage your inventory and orders with ease
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                A simple, modern dashboard to track stock, create orders, and
                grow your business without the chaos.
              </p>

              <div className="mt-8 flex flex-col gap-4 items-center justify-center sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
                >
                  Open Dashboard
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Login
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Shield size={14} className="text-emerald-600" />
                  Secure & private
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 size={14} className="text-blue-600" />
                  Real-time insights
                </div>
              </div>
            </div>

       
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to run your stock & orders
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Built for small businesses, retailers, and wholesalers who want a
              clean, fast, and reliable system.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Boxes size={20} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Inventory management
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add, edit, and track products with SKU, category, pricing, and
                real-time stock levels.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <ShoppingCart size={20} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Order management
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Create customer orders, update status, and keep track of every
                sale from one place.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <BarChart3 size={20} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Insights & analytics
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                See total products, stock, orders, and revenue at a glance with
                clear stats and alerts.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:col-span-2 lg:col-span-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Shield size={20} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Simple, secure, and fast
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Clean UI, responsive design, and secure authentication so you
                can focus on your business instead of fighting your tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              About Craft Manager
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Craft Manager is built to help small and medium businesses manage
              inventory and orders without complexity.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-3xl font-extrabold text-blue-600">100%</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Responsive design
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Works smoothly on mobile, tablet, and desktop.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-3xl font-extrabold text-blue-600">Fast</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Lightweight & quick
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Built with Next.js and Tailwind for speed and simplicity.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:col-span-2 lg:col-span-1">
              <p className="text-3xl font-extrabold text-blue-600">Secure</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Authentication ready
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Designed to plug into your JWT or session-based auth easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Boxes size={16} />
            </div>
            <span className="text-sm font-bold text-slate-800">Craft Manager</span>
          </div>

          <p className="text-center text-xs text-slate-500 sm:text-left">
            © {new Date().getFullYear()} Craft Manager. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              Dashboard
            </Link>
          </div>

        </div>
      </footer>
    </div>
  );
}