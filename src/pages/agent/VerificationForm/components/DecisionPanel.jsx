import React from "react";

export default function DecisionPanel() {
  return (
    <div className="card p-3">
      <div className="fw-semibold mb-3">Verification Decision</div>
      <div className="d-grid gap-2">
        <button className="btn btn-light border text-start">✔ Verified
          <div className="text-muted small">Property meets all criteria</div>
        </button>
        <button className="btn btn-light border text-start">✖ Rejected
          <div className="text-muted small">Property fails verification</div>
        </button>
        <button className="btn btn-light border text-start">📄 Need More Evidence
          <div className="text-muted small">Requires additional information</div>
        </button>
      </div>
      <div className="mt-3">
        <label className="form-label">Verification Report Notes</label>
        <textarea className="form-control" rows="4" placeholder="Add detailed notes about your verification..." />
      </div>
      <button className="btn btn-primary-soft w-100 mt-3">Submit Verification Report</button>
    </div>
  );
}
