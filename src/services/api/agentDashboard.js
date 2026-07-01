import { fetchAssignedVerifications, fetchVisitAssignments } from "./agent.js";

export async function fetchAgentDashboard() {
  const [verifications, visits] = await Promise.all([
    fetchAssignedVerifications(),
    fetchVisitAssignments()
  ]);

  const pending = verifications.filter((item) =>
    ["Pending Verification", "Pending", "In Progress"].includes(item.status)
  );
  const completed = verifications.filter((item) =>
    ["Verified", "Completed"].includes(item.status)
  );
  const overdue = verifications.filter((item) => {
    if (!item.dueDate) return false;
    return new Date(item.dueDate) < new Date() && !completed.includes(item);
  });

  return {
    stats: [
      {
        label: "Assigned Verifications",
        value: verifications.length,
        tone: "blue"
      },
      {
        label: "Pending Reviews",
        value: pending.length,
        tone: "amber"
      },
      {
        label: "Overdue Tasks",
        value: overdue.length,
        tone: "red"
      },
      {
        label: "Completed",
        value: completed.length,
        tone: "green"
      }
    ],
    quickActions: [
      {
        title: "Review Verifications",
        description: "Open assigned property checks",
        path: "/agent/verifications",
        tone: "blue"
      },
      {
        title: "Schedule Visits",
        description: "Confirm upcoming visit slots",
        path: "/agent/visits",
        tone: "amber"
      },
      {
        title: "QR Support",
        description: "Help tenants at visit check-in",
        path: "/agent/qr-support",
        tone: "green"
      },
      {
        title: "Settings",
        description: "Manage your account profile",
        path: "/agent/settings",
        tone: "red"
      }
    ],
    recentVerifications: verifications.slice(0, 4).map((item) => ({
      id: item.id,
      listingId: item.listingId,
      title: item.property,
      location: item.city,
      priority: String(item.priority || "medium").toLowerCase(),
      status: String(item.status || "pending").toLowerCase().replaceAll(" ", "-"),
      canStartVerification: item.canStartVerification,
      needsQrConfirmation: item.needsQrConfirmation,
      dueDate: item.dueDate || item.assignedDate || new Date().toISOString()
    })),
    upcomingVisits: visits.slice(0, 4).map((visit) => ({
      id: visit.id,
      property: visit.property,
      time: visit.slot || "Slot pending",
      tenant: visit.tenant || "Tenant pending"
    })),
    performance: [
      {
        label: "Reports Completed",
        value: completed.length,
        tone: "blue"
      },
      {
        label: "Visits Scheduled",
        value: visits.length,
        tone: "amber"
      },
      {
        label: "Approval Rate",
        value: verifications.length
          ? `${Math.round((completed.length / verifications.length) * 100)}%`
          : "0%",
        tone: "green"
      }
    ]
  };
}
