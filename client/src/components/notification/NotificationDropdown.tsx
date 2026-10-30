"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
  ExternalLink,
  LoaderCircle,
  X,
} from "lucide-react";

import {
  getNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  type Notification,
} from "@/services/notificationService";

interface NotificationDropdownProps {
  onClose: () => void;
}

export default function NotificationDropdown({
  onClose,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [markingAll, setMarkingAll] = useState(false);

  const fetchNotifications = async () => {
    try {
      setError("");

      const [notificationResponse, unread] = await Promise.all([
        getNotifications(),
        getUnreadCount(),
      ]);

      setNotifications(notificationResponse.notifications);
      setUnreadCount(unread);
    } catch (err) {
      console.error("Failed to load notifications:", err);
      setError("Couldn't load notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchNotifications();
  }, []);

  const handleMarkRead = async (notification: Notification) => {
    if (notification.is_read) return;

    try {
      setBusyId(notification.id);

      await markNotificationRead(notification.id);

      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id
            ? { ...item, is_read: true }
            : item
        )
      );

      setUnreadCount((current) => Math.max(0, current - 1));
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      setError("Couldn't update this notification.");
    } finally {
      setBusyId(null);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      setMarkingAll(true);

      await markAllNotificationsRead();

      setNotifications((current) =>
        current.map((item) => ({ ...item, is_read: true }))
      );

      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      setError("Couldn't mark notifications as read.");
    } finally {
      setMarkingAll(false);
    }
  };

  const handleDelete = async (notificationId: number) => {
    try {
      setBusyId(notificationId);

      await deleteNotification(notificationId);

      const deleted = notifications.find(
        (item) => item.id === notificationId
      );

      setNotifications((current) =>
        current.filter((item) => item.id !== notificationId)
      );

      if (deleted && !deleted.is_read) {
        setUnreadCount((current) => Math.max(0, current - 1));
      }
    } catch (err) {
      console.error("Failed to delete notification:", err);
      setError("Couldn't delete this notification.");
    } finally {
      setBusyId(null);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div
      className="absolute right-0 top-full z-50 mt-3 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      role="dialog"
      aria-label="Notifications"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
        <div>
          <h3 className="font-bold text-slate-900">Notifications</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            {unreadCount} unread
          </p>
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={markingAll}
              className="flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
            >
              <CheckCheck size={15} />
              <span className="hidden sm:inline">
                {markingAll ? "Updating..." : "Mark all read"}
              </span>
            </button>
          )}

          <button
            onClick={onClose}
            aria-label="Close notifications"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Notification list */}
      <div className="max-h-[26rem] overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-slate-500">
            <LoaderCircle size={18} className="animate-spin" />
            Loading notifications...
          </div>
        ) : error && notifications.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              onClick={() => {
                setLoading(true);
                void fetchNotifications();
              }}
              className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Bell size={22} />
            </div>

            <p className="mt-3 font-semibold text-slate-800">
              You&apos;re all caught up!
            </p>

            <p className="mt-1 text-sm text-slate-500">
              New notifications will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`border-b border-slate-100 px-4 py-4 transition hover:bg-slate-50 ${
                !notification.is_read ? "bg-blue-50/60" : "bg-white"
              }`}
            >
              <div className="flex gap-3">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Bell size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="break-words text-sm font-semibold text-slate-900">
                      {notification.title}
                    </p>

                    {!notification.is_read && (
                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600"
                        aria-label="Unread"
                      />
                    )}
                  </div>

                  <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-5 text-slate-600">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {formatTime(notification.created_at)}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {!notification.is_read && (
                      <button
                        onClick={() => void handleMarkRead(notification)}
                        disabled={busyId === notification.id}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-50"
                      >
                        Mark as read
                      </button>
                    )}

                    {notification.link && (
                      <button
                        onClick={() => {
                          if (!notification.is_read) {
                            void handleMarkRead(notification);
                          }

                          onClose();
                          window.location.assign(notification.link!);
                        }}
                        className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600"
                      >
                        View
                        <ExternalLink size={12} />
                      </button>
                    )}

                    <button
                      onClick={() => void handleDelete(notification.id)}
                      disabled={busyId === notification.id}
                      aria-label={`Delete ${notification.title}`}
                      className="ml-auto flex items-center gap-1 text-xs text-slate-400 transition hover:text-red-600 disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {error && notifications.length > 0 && (
        <p className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}