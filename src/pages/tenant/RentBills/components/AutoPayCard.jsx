import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function AutoPayCard() {
  return (
    <div className="card p-3 auto-pay-card">
      <div className="d-flex align-items-center gap-2 mb-2">
        <span className="auto-pay-icon">
          <CheckCircle2 size={16} />
        </span>
        <span className="fw-semibold">Enable Auto-pay</span>
      </div>
      <p className="text-muted small mb-2">
        Never miss a payment. Set up automatic rent payments.
      </p>
      <button className="btn btn-link p-0 text-danger">Set Up Auto-pay -&gt;</button>
    </div>
  );
}
