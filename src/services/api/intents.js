import { apiClient, unwrapData } from "./client.js";

export async function fetchIntents() {
  return unwrapData(await apiClient.get("/agreements/"));
}

export async function submitIntent(payload) {
  const { data } = await apiClient.post("/agreements/", {
    property: payload.listingId || payload.property,
    tenant: payload.tenant,
    landlord: payload.landlord,
    terms: payload.terms || {},
    status: "pending_acceptance"
  });
  return data;
}

export async function updateIntentStatus(id, status) {
  const { data } = await apiClient.patch(`/agreements/${id}/`, {
    status: String(status).toLowerCase()
  });
  return data;
}
