import React from "react";

export default function VisitAssignmentCard({ assignment }) {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between">
        <div>
          <div className="fw-semibold">{assignment.property}</div>
          <div className="text-muted small">Slot: {assignment.slot}</div>
        </div>
        <span className="badge-pill badge-info">{assignment.status}</span>
      </div>
      <div className="mt-3 d-flex justify-content-end">
        <button className="btn btn-primary-soft btn-sm">Confirm Slot</button>
      </div>
    </div>
  );
}
