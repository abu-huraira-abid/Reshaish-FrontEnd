import React from "react";
import { Bath, Bed, Check, MapPin, Ruler } from "lucide-react";
import { formatCurrency } from "../../../../utils/helpers.js";

export default function ListingSummary({ listing }) {
  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <h4 className="mb-0">{listing.title}</h4>
            <span className="badge-pill badge-verified d-inline-flex align-items-center gap-1">
              <span className="verified-check-icon">
                <Check size={12} />
              </span>
              Verified
            </span>
          </div>
          <div className="text-muted d-flex align-items-center gap-2">
            <MapPin size={16} />
            {listing.address}, {listing.city}
          </div>
        </div>
        <button className="wishlist-btn">
          <span className="visually-hidden">Favorite</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
        </button>
      </div>

      <div className="d-flex flex-wrap gap-3 text-muted small mb-3">
        <span className="d-flex align-items-center gap-1"><Bed size={14} /> {listing.beds} Bed</span>
        <span className="d-flex align-items-center gap-1"><Bath size={14} /> {listing.baths} Bath</span>
        <span className="d-flex align-items-center gap-1"><Ruler size={14} /> {listing.size} sqft</span>
        <span className="badge-pill badge-info">{listing.tag}</span>
      </div>

      <div className="d-flex align-items-baseline gap-2 mb-3">
        <div className="fs-4 fw-semibold text-danger">{formatCurrency(listing.rent)}</div>
        <div className="text-muted">/month</div>
      </div>

      <div className="text-muted small">Deposit {formatCurrency(listing.deposit)}</div>
      <div className="mt-3 text-muted">{listing.description}</div>
    </div>
  );
}
