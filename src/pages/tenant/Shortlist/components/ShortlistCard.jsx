import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../../utils/helpers.js";

export default function ShortlistCard({ listing, onRemove }) {
  return (
    <div className="card listing-card h-100">
      <div className="p-3 pb-0">
        <img src={listing.images[0]} alt={listing.title} />
      </div>
      <div className="card-body">
        <h6 className="fw-semibold">{listing.title}</h6>
        <div className="text-muted small mb-2">{listing.location}, {listing.city}</div>
        <div className="fw-semibold text-danger mb-3">{formatCurrency(listing.rent)} /month</div>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-danger btn-sm" to={`/tenant/listing/${listing.id}`}>
            View Details
          </Link>
          <button className="btn btn-light border btn-sm" onClick={() => onRemove(listing.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
