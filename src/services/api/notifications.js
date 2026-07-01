import { apiClient, unwrapData } from "./client.js";

export async function fetchNotifications() {
  return unwrapData(await apiClient.get("/notifications/"));
}

export async function markNotificationRead(id) {
  const { data } = await apiClient.post(`/notifications/${id}/mark-read/`);
  return data;
}

export async function markAllNotificationsRead() {
  const { data } = await apiClient.post("/notifications/mark-all-read/");
  return data;
}
