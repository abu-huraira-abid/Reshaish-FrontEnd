import React from "react";

const COLORS = {
  Draft: "badge-info",
  PendingVerification: "badge-pending",
  Verified: "badge-verified",
  Rejected: "badge-danger",
  Unavailable: "badge-danger",
  Requested: "badge-info",
  Scheduled: "badge-pending",
  CheckedIn: "badge-info",
  Completed: "badge-verified",
  NoShow: "badge-danger",
  Cancelled: "badge-danger",
  PendingAcceptance: "badge-pending",
  PaymentPending: "badge-info",
  Active: "badge-verified",
  Ended: "badge-danger"
};

export default function StatusBadge({ status }) {
  const color = COLORS[status] || "badge-info";
  return <span className={`badge-pill ${color}`}>{status}</span>;
}
