import React from "react";
import { Calendar, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RequestVisitCard({ listingId }) {
  const navigate = useNavigate();

  return (
    <div className="card p-4 sticky-top" style={{ top: "96px" }}>
      <div className="fw-semibold mb-2">Interested in this property?</div>
      <div className="text-muted small mb-3">
        Schedule an agent-assisted visit or submit your rental intent.
      </div>
      <div className="d-grid gap-2">
        <button
          className="btn btn-primary-soft"
          onClick={() => navigate(`/tenant/request-visit/${listingId}`)}
        >
          <Calendar size={16} className="me-2" />
          Schedule a Visit
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => navigate(`/tenant/submit-intent/${listingId}`)}
        >
          Express Interest
        </button>
        <button className="btn btn-light border" type="button">
          <Phone size={16} className="me-2" />
          Contact Hidden by Platform
        </button>
      </div>
      <div className="mt-4">
        <div className="fw-semibold mb-2">Property Highlights</div>
        <ul className="text-muted small mb-0">
          <li>Professionally verified</li>
          <li>Agent escorted visits</li>
          <li>Move-in ready</li>
        </ul>
      </div>
    </div>
  );
}
