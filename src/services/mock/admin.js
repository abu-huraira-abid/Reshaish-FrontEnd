import { mockDelay } from "../api.js";
import { listings } from "./listings.js";

const auditLogs = [
  {
    id: "a-801",
    action: "Listing verified",
    actor: "Agent Fatima Khan",
    date: "2026-02-04"
  },
  {
    id: "a-802",
    action: "Payment completed",
    actor: "Tenant Hassan Ali",
    date: "2026-02-05"
  }
];

export function fetchAdminStats() {
  return mockDelay({
    pendingVerifications: 4,
    activeAgreements: 12,
    paymentsThisMonth: 85
  });
}

export function fetchModerationListings() {
  return mockDelay(listings, 600);
}

export function fetchAuditLogs() {
  return mockDelay(auditLogs, 600);
}
