import { apiClient, unwrapData } from "./client.js";
import { mapListing, mapUser } from "./mappers.js";

export async function fetchAdminStats() {
  const [onboarding, agreements, payments] = await Promise.all([
    unwrapData(await apiClient.get("/onboarding/")),
    unwrapData(await apiClient.get("/agreements/")),
    unwrapData(await apiClient.get("/payments/"))
  ]);
  const currentMonth = new Date().toISOString().slice(0, 7);

  return {
    pendingVerifications: onboarding.filter(
      (item) => item.status === "pending_review"
    ).length,
    activeAgreements: agreements.filter((item) => item.status === "active").length,
    paymentsThisMonth: payments.filter((item) =>
      String(item.created_at || "").startsWith(currentMonth)
    ).length
  };
}

export async function fetchModerationListings() {
  const data = unwrapData(await apiClient.get("/properties/"));
  return data.map(mapListing);
}

export async function fetchAuditLogs() {
  const data = unwrapData(await apiClient.get("/audit-logs/"));
  return data.map((item) => ({
    ...item,
    actor: item.actor || "System",
    date: item.created_at?.slice?.(0, 10)
  }));
}

export async function fetchOnboardingRequests() {
  return unwrapData(await apiClient.get("/onboarding/"));
}

export async function approveOnboardingRequest(id) {
  const { data } = await apiClient.post(`/onboarding/${id}/approve/`);
  return data;
}

export async function rejectOnboardingRequest(id, reason) {
  const { data } = await apiClient.post(`/onboarding/${id}/reject/`, { reason });
  return data;
}

export async function fetchAdminUsers() {
  const data = unwrapData(await apiClient.get("/users/"));
  return data.map(mapUser);
}

export async function suspendUser(id) {
  const { data } = await apiClient.post(`/users/${id}/suspend/`);
  return mapUser(data);
}

export async function reactivateUser(id) {
  const { data } = await apiClient.post(`/users/${id}/reactivate/`);
  return mapUser(data);
}
