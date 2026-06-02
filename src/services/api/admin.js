import { apiClient, unwrapData } from "./client.js";
import { mapListing } from "./mappers.js";

export async function fetchAdminStats() {
  const [properties, agreements, payments] = await Promise.all([
    unwrapData(await apiClient.get("/properties/")),
    unwrapData(await apiClient.get("/agreements/")),
    unwrapData(await apiClient.get("/payments/"))
  ]);

  return {
    pendingVerifications: properties.filter(
      (item) => item.status === "pending_verification"
    ).length,
    activeAgreements: agreements.filter((item) => item.status === "active").length,
    paymentsThisMonth: payments.length
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
