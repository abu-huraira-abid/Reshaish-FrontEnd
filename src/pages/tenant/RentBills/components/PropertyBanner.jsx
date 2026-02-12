import React from "react";
import { formatCurrency } from "../../../../utils/helpers.js";

export default function PropertyBanner() {
  return (
    <div className="card p-3 mb-4">
      <div className="d-flex align-items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop"
          alt="Property"
          style={{ width: "64px", height: "64px", borderRadius: "12px", objectFit: "cover" }}
        />
        <div className="flex-grow-1">
          <div className="fw-semibold">Modern Studio Apartment</div>
          <div className="text-muted small">Gulberg III, Lahore</div>
        </div>
        <div className="text-end">
          <div className="text-muted small">Monthly Rent</div>
          <div className="fw-semibold">{formatCurrency(35000)}</div>
        </div>
      </div>
    </div>
  );
}
