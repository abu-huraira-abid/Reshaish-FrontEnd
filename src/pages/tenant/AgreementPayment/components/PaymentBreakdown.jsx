import React from "react";
import { formatCurrency } from "../../../../utils/helpers.js";

export default function PaymentBreakdown({ rent = 35000, deposit = 70000, charges = 2500 }) {
  const total = rent + deposit + charges;

  return (
    <div className="card p-3">
      <div className="fw-semibold mb-3">Financial Terms</div>
      <div className="d-flex justify-content-between mb-2">
        <span>Monthly Rent</span>
        <span>{formatCurrency(rent)}</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>Security Deposit</span>
        <span>{formatCurrency(deposit)}</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>Agreement Charges</span>
        <span>{formatCurrency(charges)}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between fw-semibold text-danger">
        <span>Total Initial Payment</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
