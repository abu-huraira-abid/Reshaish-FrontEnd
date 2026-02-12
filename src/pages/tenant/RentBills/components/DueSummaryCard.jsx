import React from "react";
import { AlertCircle } from "lucide-react";
import { formatCurrency } from "../../../../utils/helpers.js";

export default function DueSummaryCard() {
  const total = 27920;
  return (
    <div className="card due-card">
      <div className="d-flex align-items-center gap-2 text-white mb-2">
        <AlertCircle size={16} />
        <span className="small">Total Amount Due</span>
      </div>
      <div className="fs-3 fw-semibold text-white mb-3">{formatCurrency(total)}</div>
      <button className="btn btn-light w-100">Pay All Now</button>
    </div>
  );
}
