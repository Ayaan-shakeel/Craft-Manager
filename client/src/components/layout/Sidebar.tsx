"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
];

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">

          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white">
              C
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Craft Manager
              </h1>

              <p className="text-xs text-slate-400">
                Business Management
              </p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          {navigation.map((item) => {

            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3
                  text-sm font-medium transition
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }
                `}
              >
                <Icon size={19} />

                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="my-6 border-t border-slate-200" />

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Other
          </p>

          <Link
            href="/settings"
            onClick={onClose}
            className={`
              flex items-center gap-3 rounded-xl px-4 py-3
              text-sm font-medium transition
              ${
                isActive("/settings")
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }
            `}
          >
            <Settings size={19} />
            <span>Settings</span>
          </Link>

        </nav>

        {/* Logout */}
        <div className="border-t border-slate-200 p-4">

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>

        </div>

      </aside>
    </>
  );
}