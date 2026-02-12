import { mockDelay } from "../api.js";

const stats = [
  { label: "Total Assigned", value: "12", tone: "blue" },
  { label: "Pending", value: "5", tone: "yellow" },
  { label: "In Progress", value: "3", tone: "orange" },
  { label: "Completed", value: "4", tone: "green" }
];

const quickActions = [
  {
    title: "Assigned Verifications",
    description: "View and complete property verifications",
    tone: "red",
    path: "/agent/verifications"
  },
  {
    title: "Visit Schedule",
    description: "Manage property visits",
    tone: "blue",
    path: "/agent/visits"
  },
  {
    title: "QR Scanner",
    description: "Scan QR codes for check-in/out",
    tone: "green",
    path: "/agent/qr-support"
  },
  {
    title: "Verification Form",
    description: "Fill verification checklist quickly",
    tone: "purple",
    path: "/agent/verification-form"
  }
];

const recentVerifications = [
  {
    id: "v-1",
    title: "Luxury 2BHK in Gulberg",
    location: "Gulberg III, Lahore",
    status: "pending",
    dueDate: "2026-02-16",
    priority: "high"
  },
  {
    id: "v-2",
    title: "Studio Near Blue Area",
    location: "Blue Area, Islamabad",
    status: "in-progress",
    dueDate: "2026-02-18",
    priority: "medium"
  },
  {
    id: "v-3",
    title: "Modern 3BHK in DHA",
    location: "DHA Phase 5, Karachi",
    status: "pending",
    dueDate: "2026-02-15",
    priority: "high"
  }
];

const upcomingVisits = [
  {
    id: "u-1",
    property: "Family 3 Bed Apartment",
    time: "Today, 2:00 PM",
    tenant: "Ayesha Khan"
  },
  {
    id: "u-2",
    property: "2BHK Apartment in Clifton",
    time: "Tomorrow, 11:00 AM",
    tenant: "Sara Noor"
  },
  {
    id: "u-3",
    property: "Studio in F-10",
    time: "Feb 17, 3:00 PM",
    tenant: "Ali Raza"
  }
];

const performance = [
  { label: "Verifications Completed", value: "24", tone: "green" },
  { label: "Visits Conducted", value: "18", tone: "blue" },
  { label: "Approval Rate", value: "95%", tone: "purple" }
];

export function fetchAgentDashboard() {
  return mockDelay(
    {
      stats,
      quickActions,
      recentVerifications,
      upcomingVisits,
      performance
    },
    600
  );
}
