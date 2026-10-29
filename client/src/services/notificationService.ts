import api from "@/lib/api";

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  notification_type: string;
  is_read: boolean;
  link: string | null;
  created_at: string;
}

interface NotificationListResponse {
  message: string;
  count: number;
  notifications: Notification[];
}

interface UnreadCountResponse {
  unread_count: number;
}

interface NotificationReadResponse {
  message: string;
  notification: Notification;
}

interface NotificationDeleteResponse {
  message: string;
  notification_id: number;
}

function getAuthHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getNotifications(): Promise<NotificationListResponse> {
  const response = await fetch(`${api}/api/notifications`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications.");
  }

  return response.json();
}

export async function getUnreadCount(): Promise<number> {
  const response = await fetch(`${api}/api/notifications/unread-count`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch unread notification count.");
  }

  const data: UnreadCountResponse = await response.json();
  return data.unread_count;
}

export async function markNotificationRead(
  notificationId: number
): Promise<NotificationReadResponse> {
  const response = await fetch(
    `${api}/api/notifications/${notificationId}/read`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to mark notification as read.");
  }

  return response.json();
}

export async function markAllNotificationsRead(): Promise<{
  message: string;
  updated_count: number;
}> {
  const response = await fetch(`${api}/api/notifications/read-all`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to mark all notifications as read.");
  }

  return response.json();
}

export async function deleteNotification(
  notificationId: number
): Promise<NotificationDeleteResponse> {
  const response = await fetch(
    `${api}/api/notifications/${notificationId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete notification.");
  }

  return response.json();
}