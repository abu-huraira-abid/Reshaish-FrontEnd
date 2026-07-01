import { apiClient, unwrapData } from "./client.js";
import { mapListing, mapVisit } from "./mappers.js";

export async function fetchAssignedVerifications() {
  const [data, visits] = await Promise.all([
    unwrapData(await apiClient.get("/properties/", {
      params: { status: "pending_verification" }
    })),
    unwrapData(await apiClient.get("/visit-requests/"))
  ]);

  const visitsByProperty = visits.reduce((acc, visit) => {
    const propertyId = String(visit.property);
    const current = acc[propertyId];
    if (!current || new Date(visit.created_at) > new Date(current.created_at)) {
      acc[propertyId] = visit;
    }
    return acc;
  }, {});

  return data.map((item) => {
    const listing = mapListing(item);
    const visit = visitsByProperty[String(listing.id)];
    const visitStatus = visit?.status || "";
    return {
      id: listing.id,
      listingId: listing.id,
      property: listing.title,
      city: `${listing.location}, ${listing.city}`,
      landlord: listing.owner_email || "Landlord",
      priority: "Medium",
      status: listing.status,
      verificationVisitId: visit?.id || null,
      verificationVisitStatus: visitStatus,
      verificationVisitScheduledAt: visit?.confirmed_slot || "",
      canStartVerification: ["checked_in", "completed"].includes(visitStatus),
      needsQrConfirmation: visitStatus === "scheduled",
      needsVisitSchedule: !visitStatus,
      assignedDate: listing.created_at?.slice?.(0, 10),
      dueDate: listing.updated_at?.slice?.(0, 10)
    };
  });
}

export async function submitVerificationReport(payload) {
  const body = new FormData();
  body.append("property", payload.listingId || payload.property);
  body.append("checklist", JSON.stringify(payload.checklist || {}));
  body.append("notes", payload.notes || payload.summary || "");
  body.append("decision", String(payload.decision || "verified").toLowerCase());
  if (payload.photo) {
    body.append("photo", payload.photo);
  }

  const { data } = await apiClient.post("/verification-reports/", body, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
}

export async function scheduleVerificationVisit(payload) {
  const { data } = await apiClient.post("/visit-requests/schedule-verification/", {
    property: payload.property || payload.listingId,
    confirmed_slot: payload.confirmedSlot
  });
  return data;
}

export async function scanVerificationQr(token) {
  const { data } = await apiClient.post("/visit-qr-tokens/scan/", { token });
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
