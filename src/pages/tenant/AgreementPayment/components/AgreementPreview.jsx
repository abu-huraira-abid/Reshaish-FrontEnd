import React from "react";

export default function AgreementPreview() {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <div className="fw-semibold">Rental Agreement</div>
          <div className="text-muted small">Agreement No: AGR-2024-001234</div>
        </div>
        <button className="btn btn-light border btn-sm">Download PDF</button>
      </div>
      <div className="card-soft p-3 mb-3">
        <div className="fw-semibold">Review this agreement before payment</div>
        <div className="text-muted small">Generated on 12/2/2024</div>
      </div>
      <div className="mb-3">
        <div className="fw-semibold mb-2">Parties</div>
        <div className="row g-2">
          <div className="col-6">
            <div className="text-muted small">Landlord</div>
            <div className="fw-semibold">Kamran Ali</div>
            <div className="text-muted small">+92 300 1112233</div>
          </div>
          <div className="col-6">
            <div className="text-muted small">Tenant</div>
            <div className="fw-semibold">Hassan Ali</div>
            <div className="text-muted small">+92 300 1234567</div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="fw-semibold mb-2">Property Details</div>
        <div className="card-soft p-3">
          <div className="fw-semibold">Modern Studio Apartment</div>
          <div className="text-muted small">Gulberg III, Lahore</div>
          <div className="text-muted small">Type: Studio · Area: 650 sqft</div>
        </div>
      </div>
      <div className="mb-3">
        <div className="fw-semibold mb-2">Lease Terms</div>
        <div className="row g-2">
          <div className="col-6">
            <div className="text-muted small">Lease Start</div>
            <div className="fw-semibold">1/14/2025</div>
          </div>
          <div className="col-6">
            <div className="text-muted small">Lease End</div>
            <div className="fw-semibold">1/13/2026</div>
          </div>
          <div className="col-6">
            <div className="text-muted small">Duration</div>
            <div className="fw-semibold">12 months</div>
          </div>
          <div className="col-6">
            <div className="text-muted small">Rent Due</div>
            <div className="fw-semibold">5th of every month</div>
          </div>
        </div>
      </div>
      <div>
        <div className="fw-semibold mb-2">Terms & Conditions</div>
        <ol className="text-muted small">
          <li>Tenant shall use the premises exclusively for residential purposes.</li>
          <li>Monthly rent to be paid by the 5th of each month.</li>
          <li>Security deposit refundable within 30 days of vacating.</li>
        </ol>
      </div>
    </div>
  );
}
