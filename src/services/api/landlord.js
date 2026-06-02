import { apiClient, unwrapData } from "./client.js";
import { mapListing } from "./mappers.js";

export async function fetchMyListings() {
  const data = unwrapData(await apiClient.get("/properties/"));
  return data.map(mapListing);
}

export async function submitListing(payload) {
  const { data } = await apiClient.post("/properties/", {
    title: payload.title,
    property_type: String(payload.type || "apartment").toLowerCase(),
    address: payload.address || payload.location || payload.city,
    city: payload.city,
    rent: Number(payload.rent || 0),
    deposit: Number(payload.deposit || 0),
    facilities: payload.facilities || [],
    rules: payload.rules || [],
    description: payload.description || ""
  });
  return mapListing(data);
}

export async function fetchVerificationFeedback() {
  return unwrapData(await apiClient.get("/verification-reports/"));
}
