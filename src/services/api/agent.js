import { apiClient, unwrapData } from "./client.js";
import { mapListing, mapVisit } from "./mappers.js";

export async function fetchAssignedVerifications() {
  const data = unwrapData(await apiClient.get("/properties/", {
    params: { status: "pending_verification" }
  }));
  return data.map((item) => {
    const listing = mapListing(item);
    return {
      id: listing.id,
      listingId: listing.id,
      property: listing.title,
      city: `${listing.location}, ${listing.city}`,
      landlord: listing.owner_email || "Landlord",
      priority: "Medium",
      status: listing.status,
      assignedDate: listing.created_at?.slice?.(0, 10),
      dueDate: listing.updated_at?.slice?.(0, 10)
    };
  });
}

export async function submitVerificationReport(payload) {
  const { data } = await apiClient.post("/verification-reports/", {
    property: payload.listingId || payload.property,
    checklist: payload.checklist || {},
    notes: payload.notes || payload.summary || "",
    decision: String(payload.decision || "verified").toLowerCase()
  });
  return data;
}

export async function fetchVisitAssignments() {
  const data = unwrapData(await apiClient.get("/visit-requests/"));
  return data.map((item) => {
    const visit = mapVisit(item);
    return {
      id: visit.id,
      visitId: visit.id,
      property: visit.property,
      slot: visit.confirmedSlot,
      status: visit.status
    };
  });
}
