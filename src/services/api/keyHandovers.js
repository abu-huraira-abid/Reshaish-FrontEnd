import { apiClient } from "./client.js";

export async function startKeyHandover(propertyId) {
  const { data } = await apiClient.post("/key-handovers/start/", {
    property: propertyId
  });
  return data;
}

export async function verifyKeyHandoverOtp({ propertyId, code, notes }) {
  const { data } = await apiClient.post("/key-handovers/verify-otp/", {
    property: propertyId,
    code,
    notes: notes || ""
  });
  return data;
}
