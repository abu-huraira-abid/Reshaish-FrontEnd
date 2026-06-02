import { fetchAssignedVerifications, fetchVisitAssignments } from "./agent.js";

export async function fetchAgentDashboard() {
  const [verifications, visits] = await Promise.all([
    fetchAssignedVerifications(),
    fetchVisitAssignments()
  ]);

  return {
    assigned: verifications.length,
    scheduledVisits: visits.length,
    completed: verifications.filter((item) => item.status === "Verified").length
  };
}
