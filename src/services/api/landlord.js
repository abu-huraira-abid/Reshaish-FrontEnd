import { apiClient, unwrapData } from "./client.js";
import { mapListing } from "./mappers.js";

export async function fetchMyListings() {
  const data = unwrapData(await apiClient.get("/properties/"));
  return data.map(mapListing);
}

function buildListingFormData(payload) {
  const body = new FormData();
  body.append("title", payload.title);
  body.append("property_type", payload.type);
  body.append("address", payload.address);
  body.append("city", payload.city);
  body.append("bedrooms", Number(payload.bedrooms || 1));
  body.append("bathrooms", Number(payload.bathrooms || 1));
  body.append("area_sqft", Number(payload.area || 0));
  body.append("rent", Number(payload.rent || 0));
  body.append("deposit", Number(payload.deposit || 0));
  body.append("description", payload.description || "");
  body.append("facilities", JSON.stringify(payload.facilities || []));
  body.append("rules", JSON.stringify(payload.rules || []));
  body.append("delete_image_ids", JSON.stringify(payload.deleteImageIds || []));
  (payload.photos || []).forEach((photo) => {
    body.append("images", photo);
  });
  if (payload.ownershipProof) {
    body.append("ownership_proof", payload.ownershipProof);
  }
  return body;
}

export async function submitListing(payload) {
  const body = buildListingFormData(payload);
  const { data } = await apiClient.post("/properties/", body, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return mapListing(data);
}

export async function fetchMyListing(id) {
  const { data } = await apiClient.get(`/properties/${id}/`);
  return mapListing(data);
}

export async function updateListing(id, payload) {
  const body = buildListingFormData(payload);
  const { data } = await apiClient.patch(`/properties/${id}/`, body, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return mapListing(data);
}

export async function fetchVerificationFeedback() {
  return unwrapData(await apiClient.get("/verification-reports/"));
}
