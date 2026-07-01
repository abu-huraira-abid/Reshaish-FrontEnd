import React from "react";
import { Calendar, ClipboardList, Phone, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RequestVisitCard({ activeTenancy, inProcessAgreement, listingId }) {
  const navigate = useNavigate();

  if (activeTenancy) {
    return (
      <div className="card p-4 sticky-top" style={{ top: "96px" }}>
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="icon-box icon-box-soft">
            <ClipboardList size={17} />
          </span>
          <div className="fw-semibold">You are renting this home</div>
        </div>
        <div className="text-muted small mb-3">
          View your tenancy details, report property issues, or submit a leave notice.
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary-soft"
            onClick={() => navigate(`/tenant/property-history?tenancy=${activeTenancy.id}`)}
          >
            <Wrench size={16} className="me-2" />
            View Rental & Report Issue
          </button>
          <button className="btn btn-light border" type="button">
            <Phone size={16} className="me-2" />
            Contact Managed by Platform
          </button>
        </div>
        <div className="mt-4">
          <div className="fw-semibold mb-2">Rental Status</div>
          <div className="badge-pill badge-verified">
            {String(activeTenancy.status || "active").replaceAll("_", " ")}
          </div>
        </div>
      </div>
    );
  }

  if (inProcessAgreement) {
    const isPaymentPending = inProcessAgreement.status === "payment_pending";

    return (
      <div className="card p-4 sticky-top" style={{ top: "96px" }}>
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="icon-box icon-box-soft">
            <ClipboardList size={17} />
          </span>
          <div className="fw-semibold">Agreement in process</div>
        </div>
        <div className="text-muted small mb-3">
          {isPaymentPending
            ? "Landlord accepted your request. Review agreement and complete payment."
            : "Your rental request is waiting for landlord acceptance."}
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary-soft"
            onClick={() =>
              navigate(
                isPaymentPending
                  ? `/tenant/agreement-preview/${listingId}`
                  : "/tenant/property-history"
              )
            }
          >
            <ClipboardList size={16} className="me-2" />
            {isPaymentPending ? "Continue Agreement" : "View My Rental"}
          </button>
        </div>
        <div className="mt-4">
          <div className="fw-semibold mb-2">Current Status</div>
          <div className={`badge-pill ${isPaymentPending ? "badge-verified" : "badge-pending"}`}>
            {isPaymentPending ? "Payment Pending" : "Pending Landlord"}
          </div>
        </div>
      </div>
    );
  }

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
