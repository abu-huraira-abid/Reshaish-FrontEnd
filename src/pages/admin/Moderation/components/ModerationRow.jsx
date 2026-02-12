import React from "react";

export default function ModerationRow({ listing, onAction }) {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="fw-semibold">{listing.title}</div>
          <div className="text-muted small">{listing.city} · {listing.type}</div>
        </div>
        <span className="badge-pill badge-info">{listing.status}</span>
      </div>
      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-primary-soft btn-sm" onClick={() => onAction(listing.id, "Verified")}>
          Approve
        </button>
        <button className="btn btn-light border btn-sm" onClick={() => onAction(listing.id, "Rejected")}>
          Reject
        </button>
      </div>
    </div>
  );
}
