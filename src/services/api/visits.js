import { apiClient, unwrapData } from "./client.js";
import { mapVisit } from "./mappers.js";

export async function fetchVisitRequests() {
  const data = unwrapData(await apiClient.get("/visit-requests/"));
  return data.map(mapVisit);
}

export async function fetchVisitQrTokens() {
  const data = unwrapData(await apiClient.get("/visit-qr-tokens/"));
  return data.map((item) => ({
    ...item,
    visitId: item.visit,
    token: item.token_value
  }));
}

export async function createVisitRequest(payload) {
  const { data } = await apiClient.post("/visit-requests/", {
    property: payload.property || payload.listingId,
    requested_slots: payload.requestedSlots || []
  });
  return mapVisit(data);
}

export async function updateVisitStatus(id, status) {
  const { data } = await apiClient.patch(`/visit-requests/${id}/`, {
    status: String(status).toLowerCase().replaceAll(" ", "_")
  });
  return mapVisit(data);
}

export async function scheduleTenantVisit(id, confirmedSlot) {
  const { data } = await apiClient.patch(`/visit-requests/${id}/`, {
    confirmed_slot: confirmedSlot,
    status: "scheduled"
  });
  return mapVisit(data);
}

export async function generateQrToken(id) {
  const expiry = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  const { data } = await apiClient.post("/visit-qr-tokens/", {
    visit: id,
    expiry_time: expiry
  });
  return {
    visitId: id,
    token: data.token_value,
    ...data
  };
}
