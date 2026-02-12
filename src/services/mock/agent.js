import { mockDelay } from "../api.js";

const assignedVerifications = [
  {
    id: "av-601",
    listingId: "l-100",
    property: "Modern Studio Apartment",
    city: "Gulberg, Lahore",
    landlord: "Kamran Ali",
    priority: "High",
    status: "Pending",
    assignedDate: "2024-12-19",
    dueDate: "2024-12-26"
  },
  {
    id: "av-602",
    listingId: "l-103",
    property: "Stylish Loft Apartment",
    city: "DHA Phase 5, Lahore",
    landlord: "Hina Ahmed",
    priority: "Medium",
    status: "In Progress",
    assignedDate: "2024-12-21",
    dueDate: "2024-12-28"
  },
  {
    id: "av-603",
    listingId: "l-102",
    property: "Spacious Villa with Pool",
    city: "E-11, Islamabad",
    landlord: "Usman Raza",
    priority: "High",
    status: "Pending",
    assignedDate: "2024-12-17",
    dueDate: "2024-12-24"
  },
  {
    id: "av-604",
    listingId: "l-105",
    property: "Bright 2 BHK with Balcony",
    city: "DHA Phase 2, Karachi",
    landlord: "Sana Iqbal",
    priority: "Low",
    status: "Completed",
    assignedDate: "2024-12-14",
    dueDate: "2024-12-21"
  }
];

const visitAssignments = [
  {
    id: "va-701",
    visitId: "v-201",
    property: "Modern Studio Apartment",
    slot: "Mar 12, 10:00",
    status: "Scheduled"
  }
];

export function fetchAssignedVerifications() {
  return mockDelay(assignedVerifications, 500);
}

export function submitVerificationReport(payload) {
  return mockDelay({ id: `r-${Date.now()}`, ...payload }, 800);
}

export function fetchVisitAssignments() {
  return mockDelay(visitAssignments, 600);
}
