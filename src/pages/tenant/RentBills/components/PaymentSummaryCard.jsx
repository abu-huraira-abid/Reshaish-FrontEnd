import React from "react";
import { formatCurrency } from "../../../../utils/helpers.js";

export default function PaymentSummaryCard() {
  const rent = 25000;
  const bills = 2920;
  return (
    <div className="card p-3 payment-summary-card">
      <h6 className="mb-3">Payment Summary</h6>
      <div className="d-flex justify-content-between mb-2">
        <span className="text-muted">Rent Due</span>
        <span>{formatCurrency(rent)}</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span className="text-muted">Utility Bills</span>
        <span>{formatCurrency(bills)}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between fw-semibold">
        <span>Total</span>
        <span className="text-danger">{formatCurrency(rent + bills)}</span>
      </div>
    </div>
  );
}
