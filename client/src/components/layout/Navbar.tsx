"use client";

import React from "react";
import { Menu, Bell, UserRound } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="text-sm font-medium text-slate-400">
            Welcome back
          </p>

          <h2 className="text-lg font-bold text-slate-800">
            Craft Manager
          </h2>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">

        <button
          className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <UserRound size={19} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Admin
            </p>

            <p className="text-xs text-slate-400">
              Account
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}