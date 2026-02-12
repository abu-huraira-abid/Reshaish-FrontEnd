import React from "react";

const statusStyles = {
  Verified: "badge-verified",
  Rejected: "badge-danger",
  "Need More Evidence": "badge-pending"
};

export default function ReportCard({ report }) {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="fw-semibold">Listing {report.listingId}</div>
          <div className="text-muted small">{report.summary}</div>
        </div>
        <span className={`badge-pill ${statusStyles[report.decision]}`}>{report.decision}</span>
      </div>
      <div className="mt-2 text-muted small">{report.notes}</div>
    </div>
  );
}
