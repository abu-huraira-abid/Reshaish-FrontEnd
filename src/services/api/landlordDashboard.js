import { fetchMyListings } from "./landlord.js";
import { fetchPayments } from "./payments.js";
import { fetchVisitRequests } from "./visits.js";

export async function fetchLandlordDashboard() {
  const [listings, visits, payments] = await Promise.all([
    fetchMyListings(),
    fetchVisitRequests(),
    fetchPayments()
  ]);

  const safeListings = Array.isArray(listings) ? listings : [];
  const safeVisits = Array.isArray(visits) ? visits : [];
  const safePayments = Array.isArray(payments) ? payments : [];
  const verifiedListings = safeListings.filter((item) => item.status === "Verified");
  const pendingVisits = safeVisits.filter((item) => item.status === "Requested");
  const successfulPayments = safePayments.filter((item) => item.status === "Success");
  const totalIncome = successfulPayments.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return {
    stats: [
      {
        label: "Total Properties",
        value: safeListings.length,
        tone: "primary"
      },
      {
        label: "Pending Requests",
        value: pendingVisits.length,
        tone: "warning"
      },
      {
        label: "Verified Listings",
        value: verifiedListings.length,
        tone: "success"
      },
      {
        label: "Total Income",
        value: `PKR ${totalIncome.toLocaleString()}`,
        tone: "danger"
      }
    ],
    requests: safeVisits.slice(0, 4).map((visit) => ({
      id: visit.id,
      title: visit.property,
      subtitle: visit.location || visit.confirmedSlot || "Visit request",
      status: visit.status
    })),
    payments: safePayments.slice(0, 4).map((payment) => ({
      id: payment.id,
      amount: `PKR ${Number(payment.amount || 0).toLocaleString()}`,
      subtitle: payment.description || payment.date || "Payment",
      status: payment.status
    })),
    properties: safeListings.slice(0, 4).map((listing) => ({
      ...listing,
      image: listing.image || listing.images?.[0],
      price: listing.price || listing.rent,
      sqft: listing.sqft || listing.size
    }))
  };
}
