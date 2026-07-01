import React from "react";

export default function ModerationRow({ listing }) {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="fw-semibold">{listing.title}</div>
          <div className="text-muted small">{listing.city} · {listing.type}</div>
        </div>
        <span className="badge-pill badge-info">{listing.status}</span>
      </div>
    </div>
  );
}
