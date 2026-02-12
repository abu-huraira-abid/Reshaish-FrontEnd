import React from "react";
import { formatCurrency } from "../../../../utils/helpers.js";

const statusStyles = {
  pending: "badge-pending",
  accepted: "badge-verified",
  rejected: "badge-danger"
};

export default function IntentRow({ intent, onAccept, onReject }) {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex gap-3">
          <img
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=400&auto=format&fit=crop"
            alt={intent.property}
            style={{ width: "64px", height: "64px", borderRadius: "12px", objectFit: "cover" }}
          />
          <div>
            <div className="fw-semibold">{intent.property}</div>
            <div className="text-muted small">{intent.location}</div>
          </div>
        </div>
        <span className={`badge-pill ${statusStyles[intent.status]}`}>{intent.status.toUpperCase()}</span>
      </div>

      <div className="row g-4 mt-3">
        <div className="col-md-6">
          <div className="fw-semibold mb-2">Tenant Information</div>
          <div className="text-muted small">Name</div>
          <div className="mb-2">{intent.tenant.name}</div>
          <div className="text-muted small">Contact</div>
          <div className="mb-2">{intent.tenant.phone}</div>
          <div className="mb-2">{intent.tenant.email}</div>
          <div className="text-muted small">Occupation</div>
          <div className="mb-2">{intent.tenant.occupation}</div>
          <div className="text-muted small">Monthly Income</div>
          <div className="fw-semibold text-success">{intent.tenant.income}</div>
        </div>
        <div className="col-md-6">
          <div className="fw-semibold mb-2">Lease Details</div>
          <div className="text-muted small">Move-in Date</div>
          <div className="mb-2">{intent.lease.moveIn}</div>
          <div className="text-muted small">Lease Duration</div>
          <div className="mb-2">{intent.lease.duration}</div>
          <div className="text-muted small">Submitted On</div>
          <div className="mb-2">{intent.lease.submittedOn}</div>
          <div className="text-muted small">Emergency Contact</div>
          <div>{intent.lease.emergencyContact}</div>
          <div className="text-muted small">{intent.lease.emergencyPhone}</div>
        </div>
      </div>

      <div className="card-soft p-3 mt-3">
        <div className="fw-semibold mb-2">Additional Notes</div>
        <div className="text-muted small">{intent.notes}</div>
      </div>

      <div className="card-soft p-3 mt-3">
        <div className="fw-semibold mb-2">Initial Payment Summary</div>
        <div className="d-flex justify-content-between">
          <div>
            <div className="text-muted small">Security Deposit</div>
            <div className="fw-semibold">{formatCurrency(intent.payment.deposit)}</div>
          </div>
          <div>
            <div className="text-muted small">First Month Rent</div>
            <div className="fw-semibold">{formatCurrency(intent.payment.rent)}</div>
          </div>
          <div>
            <div className="text-muted small">Total Initial</div>
            <div className="fw-semibold text-danger">{formatCurrency(intent.payment.total)}</div>
          </div>
        </div>
      </div>

      {intent.status === "pending" && (
        <div className="d-flex gap-3 mt-3">
          <button className="btn btn-outline-danger px-4" onClick={() => onReject(intent)}>
            Reject Request
          </button>
          <button className="btn btn-primary-soft px-4" onClick={() => onAccept(intent)}>
            Accept & Generate Agreement
          </button>
        </div>
      )}

      {intent.status !== "pending" && (
        <div className="d-flex mt-3">
          <button className="btn btn-primary-soft px-4">View Agreement</button>
        </div>
      )}
    </div>
  );
}
