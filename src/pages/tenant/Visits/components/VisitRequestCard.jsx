import React from "react";

const statusStyles = {
  Requested: "badge-info",
  Scheduled: "badge-pending",
  Completed: "badge-verified",
  Cancelled: "badge-danger"
};

export default function VisitRequestCard({ visit }) {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="fw-semibold">{visit.property}</div>
          <div className="text-muted small">Visit ID: {visit.id}</div>
        </div>
        <span className={`badge-pill ${statusStyles[visit.status] || "badge-info"}`}>{visit.status}</span>
      </div>
      <div className="mt-2 text-muted small">Preferred slots: {visit.requestedSlots.join(", ")}</div>
      <div className="text-muted small">Confirmed slot: {visit.confirmedSlot || "Pending"}</div>
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-outline-danger btn-sm">Reschedule</button>
        <button className="btn btn-primary-soft btn-sm">View QR</button>
      </div>
    </div>
  );
}
