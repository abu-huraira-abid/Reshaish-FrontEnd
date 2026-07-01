import React from "react";

export default function PropertyDetails({ property }) {
  return (
    <div className="card p-3">
      <div className="fw-semibold mb-2">Property Details</div>
      <div className="fw-semibold">{property?.property || "Property"}</div>
      <div className="text-muted small mb-2">{property?.city || "Location not provided"}</div>
      <div className="text-muted small">Landlord: {property?.landlord || "Landlord"}</div>
      <div className="text-muted small">
        Visit status: {property?.verificationVisitStatus || "Not scheduled"}
      </div>
    </div>
  );
}
