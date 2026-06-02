import { apiClient, unwrapData } from "./client.js";
import { mapListing } from "./mappers.js";

const propertyTypeMap = {
  House: "house",
  Apartment: "apartment",
  Studio: "room",
  Room: "room",
  Villa: "house"
};

export const listings = [];

export async function fetchListings(filters = {}) {
  const params = {
    city: filters.city || undefined,
    property_type: propertyTypeMap[filters.type] || filters.type || undefined,
    status: filters.verified ? "verified" : filters.status,
    search: filters.search || undefined,
    ordering: filters.ordering || undefined
  };

  const data = unwrapData(await apiClient.get("/properties/", { params }));
  return data
    .map(mapListing)
    .filter((item) => !filters.minRent || item.rent >= Number(filters.minRent))
    .filter((item) => !filters.maxRent || item.rent <= Number(filters.maxRent))
    .filter((item) => !filters.beds || item.beds === Number(filters.beds))
    .filter((item) => !filters.minSize || item.size >= Number(filters.minSize))
    .filter((item) => !filters.maxSize || item.size <= Number(filters.maxSize))
    .filter((item) => !filters.portion || item.portion === filters.portion)
    .filter(
      (item) =>
        !filters.residentialType ||
        item.residentialType === filters.residentialType
    );
}

export async function fetchListingById(id) {
  const { data } = await apiClient.get(`/properties/${id}/`);
  return mapListing(data);
}
