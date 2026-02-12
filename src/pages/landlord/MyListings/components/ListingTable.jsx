import React from "react";

const statusStyles = {
  Verified: "badge-verified",
  PendingVerification: "badge-pending",
  Rejected: "badge-danger"
};

export default function ListingTable({ listings }) {
  return (
    <div className="d-grid gap-3">
      {listings.map((listing) => (
        <div className="card p-3" key={listing.id}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-semibold">{listing.title}</div>
              <div className="text-muted small">{listing.address}, {listing.city}</div>
            </div>
            <span className={`badge-pill ${statusStyles[listing.status] || "badge-info"}`}>
              {listing.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
