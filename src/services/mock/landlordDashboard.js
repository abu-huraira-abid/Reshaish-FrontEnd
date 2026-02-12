import { mockDelay } from "../api.js";
import { listings } from "./listings.js";
import { formatCurrency } from "../../utils/helpers.js";

const dashboardStats = [
  { label: "Total Properties", value: "8", tone: "blue" },
  { label: "Active Tenants", value: "6", tone: "green" },
  { label: "Pending Requests", value: "12", tone: "yellow" },
  { label: "Monthly Revenue", value: formatCurrency(240000), tone: "purple" }
];

const recentRequests = [
  {
    id: "req-1",
    title: "Visit Request",
    subtitle: "Gulberg Studio Apartment",
    status: "Pending"
  },
  {
    id: "req-2",
    title: "Rental Intent",
    subtitle: "DHA Phase 5 Loft",
    status: "Pending"
  },
  {
    id: "req-3",
    title: "Visit Request",
    subtitle: "F-10 Family Flat",
    status: "Scheduled"
  }
];

const recentPayments = [
  {
    id: "pay-1",
    amount: formatCurrency(52000),
    subtitle: "Ayesha Khan - Jan 2026",
    status: "Paid"
  },
  {
    id: "pay-2",
    amount: formatCurrency(68000),
    subtitle: "Ali Raza - Jan 2026",
    status: "Paid"
  },
  {
    id: "pay-3",
    amount: formatCurrency(45000),
    subtitle: "Hamza Noor - Dec 2025",
    status: "Paid"
  }
];

const properties = listings.slice(0, 4).map((listing) => ({
  id: listing.id,
  title: listing.title,
  location: `${listing.location}, ${listing.city}`,
  price: listing.rent,
  beds: listing.beds,
  baths: listing.baths,
  sqft: listing.size,
  image: listing.images?.[0],
  type: listing.tag
}));

export function fetchLandlordDashboard() {
  return mockDelay(
    {
      stats: dashboardStats,
      requests: recentRequests,
      payments: recentPayments,
      properties
    },
    600
  );
}
