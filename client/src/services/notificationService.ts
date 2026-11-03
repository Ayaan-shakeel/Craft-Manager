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

interface NotificationReadResponse {
  message: string;
  notification: Notification;
}

interface NotificationDeleteResponse {
  message: string;
  notification_id: number;
}

// Get all notifications
export const getNotifications = async (): Promise<NotificationListResponse> => {
  const response = await api.get("/api/notifications");
  return response.data;
};

// Get unread count
export const getUnreadCount = async (): Promise<number> => {
  const response = await api.get("/api/notifications/unread-count");
  return response.data.unread_count;
};

// Mark one notification as read
export const markNotificationRead = async (
  notificationId: number
): Promise<NotificationReadResponse> => {
  const response = await api.patch(
    `/api/notifications/${notificationId}/read`
  );

  return response.data;
};

// Mark all notifications as read
export const markAllNotificationsRead = async () => {
  const response = await api.patch("/api/notifications/read-all");
  return response.data;
};

// Delete notification
export const deleteNotification = async (
  notificationId: number
): Promise<NotificationDeleteResponse> => {
  const response = await api.delete(
    `/api/notifications/${notificationId}`
  );

  return response.data;
};