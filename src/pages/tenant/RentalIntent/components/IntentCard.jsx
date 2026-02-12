import React from "react";
import { Calendar, MapPin } from "lucide-react";

const statusStyles = {
  pending: "badge-pending",
  accepted: "badge-verified",
  rejected: "badge-danger"
};

export default function IntentCard({ intent }) {
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
            {new Date(intent.lease.moveIn).toLocaleDateString("en-PK")}
          </div>
        </div>
        <div className="col-md-4">
          <div className="text-muted small">Lease Duration</div>
          <div className="fw-semibold">{intent.lease.duration}</div>
        </div>
        <div className="col-md-4">
          <div className="text-muted small">Submitted On</div>
          <div className="fw-semibold">{new Date(intent.lease.submittedOn).toLocaleDateString("en-PK")}</div>
        </div>
      </div>

      <div className="mt-3 text-muted small">{intent.notes}</div>
    </div>
  );
}
