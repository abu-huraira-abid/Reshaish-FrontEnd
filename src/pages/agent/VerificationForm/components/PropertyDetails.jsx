import React from "react";

export default function PropertyDetails() {
  return (
    <div className="card p-3">
      <div className="fw-semibold mb-2">Property Details</div>
      <div className="fw-semibold">Modern Studio Apartment</div>
      <div className="text-muted small mb-2">Gulberg III, Lahore</div>
      <div className="d-flex gap-3 text-muted small mb-2">
        <span>1 Bed</span>
        <span>1 Bath</span>
        <span>650 sqft</span>
      </div>
      <div className="text-muted small">Landlord: Kamran Ali</div>
      <div className="text-muted small">Contact: +92 300 1112233</div>
      <div className="text-muted small">Address: Gulberg III, Lahore</div>
    </div>
  );
}
