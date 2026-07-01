import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  pending: "badge-pending",
  accepted: "badge-verified",
  rejected: "badge-danger"
};

export default function IntentCard({ intent }) {
  const navigate = useNavigate();
  const lease = intent.lease || {};
  const moveInDate = lease.moveIn && lease.moveIn !== "To be confirmed"
    ? new Date(lease.moveIn).toLocaleDateString("en-PK")
    : "To be confirmed";

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <div>
          <div className="fw-semibold mb-1">{intent.property}</div>
          <div className="text-muted small d-flex align-items-center gap-2">
            <MapPin size={14} />
            {intent.location}
          </div>
        </div>
        <span className={`badge-pill ${statusStyles[intent.status]}`}>{intent.status}</span>
      </div>

      <div className="row g-3 mt-2">
        <div className="col-md-4">
          <div className="text-muted small">Move-in Date</div>
          <div className="fw-semibold d-flex align-items-center gap-2">
            <Calendar size={14} />
            {moveInDate}
          </div>
        </div>
        <div className="col-md-4">
          <div className="text-muted small">Lease Duration</div>
          <div className="fw-semibold">{lease.duration || "12 months"}</div>
        </div>
        <div className="col-md-4">
          <div className="text-muted small">Submitted On</div>
          <div className="fw-semibold">
            {lease.submittedOn
              ? new Date(lease.submittedOn).toLocaleDateString("en-PK")
              : "Recently"}
          </div>
        </div>
      </div>

      <div className="mt-3 text-muted small">{intent.notes}</div>

      {intent.status === "pending" && (
        <div className="card-soft p-3 mt-3 text-muted small">
          Waiting for landlord acceptance. You can sign the agreement after the landlord accepts.
        </div>
      )}

      {intent.status === "accepted" && (
        <button
          className="btn btn-primary-soft mt-3"
          onClick={() => navigate(`/tenant/agreement-preview/${intent.listingId}`)}
          type="button"
        >
          Review Agreement & Pay
        </button>
      )}
    </div>
  );
}
