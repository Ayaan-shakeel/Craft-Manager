"use client";

import React, { useEffect, useState } from "react";
import { Menu, Bell, UserRound } from "lucide-react";

import { user } from "@/services/authService";
import { getUnreadCount } from "@/services/notificationService";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [username, setUsername] = useState("Admin");
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      try {
        const response = await user();

        if (active && response?.user?.username) {
          setUsername(response.user.username);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    const fetchUnreadCount = async () => {
      try {
        const count = await getUnreadCount();

        if (active) {
          setUnreadCount(count);
        }
      } catch (error) {
        console.error("Failed to fetch unread notifications:", error);
      }
    };

    void fetchUser();
    void fetchUnreadCount();

    const interval = window.setInterval(() => {
      void fetchUnreadCount();
    }, 30000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
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
        {/* Notification bell and dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen((open) => !open)}
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
            aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
            aria-expanded={notificationsOpen}
            aria-haspopup="dialog"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <NotificationDropdown
              onClose={() => setNotificationsOpen(false)}
            />
          )}
        </div>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Account */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <UserRound size={19} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {username}
            </p>

            <p className="text-xs text-slate-400">Account</p>
          </div>
        </div>
      </div>
    </header>
  );
}