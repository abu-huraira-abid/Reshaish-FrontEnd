import { fetchMyListings } from "./landlord.js";
import { fetchVisitRequests } from "./visits.js";

export async function fetchLandlordDashboard() {
  const [listings, visits] = await Promise.all([
    fetchMyListings(),
    fetchVisitRequests()
  ]);

  return {
    properties: listings.length,
    verified: listings.filter((item) => item.status === "Verified").length,
    visits: visits.length
  };
}
