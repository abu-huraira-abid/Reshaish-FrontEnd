import { mockDelay } from "../api.js";
import { listings } from "./listings.js";

const verificationReports = [
  {
    id: "r-501",
    listingId: "l-100",
    decision: "Verified",
    summary: "Photos matched and utilities working.",
    notes: "Tenant should verify water pump timing."
  },
  {
    id: "r-502",
    listingId: "l-104",
    decision: "Rejected",
    summary: "Ownership docs incomplete.",
    notes: "Request updated authorization letter."
  }
];

export function fetchMyListings() {
  return mockDelay(listings, 600);
}

export function submitListing(payload) {
  const listing = {
    id: `l-${Date.now()}`,
    status: "PendingVerification",
    ...payload
  };
  listings.push(listing);
  return mockDelay(listing, 900);
}

export function fetchVerificationFeedback() {
  return mockDelay(verificationReports, 700);
}
