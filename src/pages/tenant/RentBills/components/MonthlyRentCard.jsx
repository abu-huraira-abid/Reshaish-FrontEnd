import React from "react";
import { Calendar, Home } from "lucide-react";
import { formatCurrency } from "../../../../utils/helpers.js";

export default function MonthlyRentCard() {
  return (
    <div className="card rent-card">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="d-flex gap-2">
          <span className="rent-icon">
            <Home size={16} />
          </span>
          <div>
            <div className="fw-semibold">Monthly Rent</div>
            <div className="text-muted small">Due on 5th of every month</div>
          </div>
        </div>
        <span className="badge-pill badge-danger">Due</span>
      </div>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="text-muted small">Payment Period</div>
          <div className="fw-semibold">January 2025</div>
        </div>
        <div className="col-md-6">
          <div className="text-muted small">Due Date</div>
          <div className="fw-semibold">1/4/2025</div>
        </div>
        <div className="col-md-6">
          <div className="text-muted small">Amount</div>
          <div className="fw-semibold text-danger">{formatCurrency(25000)}</div>
        </div>
        <div className="col-md-6">
          <div className="text-muted small">Days Remaining</div>
          <div className="fw-semibold">-354 days</div>
        </div>
      </div>
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-primary-soft flex-grow-1">Pay Rent Now</button>
        <button className="btn btn-light border" type="button">
          <Calendar size={16} />
        </button>
      </div>
    </div>
  );
}
