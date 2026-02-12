import React from "react";

export default function VisitRequestRow({ visit, onAction }) {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="fw-semibold">{visit.property}</div>
          <div className="text-muted small">Requested: {visit.requestedSlots.join(", ")}</div>
        </div>
        <span className="badge-pill badge-info">{visit.status}</span>
      </div>
      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-primary-soft btn-sm" onClick={() => onAction(visit.id, "Scheduled")}>
          Approve
        </button>
        <button className="btn btn-light border btn-sm" onClick={() => onAction(visit.id, "Cancelled")}>
          Decline
        </button>
      </div>
    </div>
  );
}
