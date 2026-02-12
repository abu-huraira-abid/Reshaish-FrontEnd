import React from "react";

const priorityStyles = {
  High: "badge-danger",
  Medium: "badge-pending",
  Low: "badge-info"
};

const statusStyles = {
  Pending: "badge-pending",
  "In Progress": "badge-info",
  Completed: "badge-verified"
};

export default function VerificationCard({ item }) {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between">
        <div>
          <div className="fw-semibold">{item.property}</div>
          <div className="text-muted small">{item.city}</div>
          <div className="text-muted small">Landlord: {item.landlord}</div>
        </div>
        <div className="d-flex gap-2 align-items-start">
          <span className={`badge-pill ${priorityStyles[item.priority]}`}>{item.priority.toUpperCase()}</span>
          <span className={`badge-pill ${statusStyles[item.status]}`}>{item.status}</span>
        </div>
      </div>
      <div className="d-flex gap-4 mt-3 text-muted small">
        <div>Assigned: {item.assignedDate}</div>
        <div className="text-danger">Due: {item.dueDate}</div>
      </div>
      <div className="mt-3 d-flex justify-content-end">
        <button className="btn btn-outline-danger btn-sm">
          {item.status === "Completed" ? "View Report" : "Start Verification"} →
        </button>
      </div>
    </div>
  );
}
