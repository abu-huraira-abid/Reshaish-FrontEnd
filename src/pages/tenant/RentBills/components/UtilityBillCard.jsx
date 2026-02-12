import React from "react";
import { Calendar, Droplet, Flame, Receipt, Wifi, Zap } from "lucide-react";
import { formatCurrency } from "../../../../utils/helpers.js";

const statusStyles = {
  Pending: "status-pill pending",
  Paid: "status-pill paid"
};

const iconByName = (name) => {
  if (name === "Electricity") return <Zap size={16} />;
  if (name === "Water") return <Droplet size={16} />;
  if (name === "Gas") return <Flame size={16} />;
  if (name === "Internet") return <Wifi size={16} />;
  return <Receipt size={16} />;
};

export default function UtilityBillCard({ bill }) {
  const isPaid = bill.status === "Paid";
  return (
    <div className="card utility-card">
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex gap-2">
          <span className="utility-icon">{iconByName(bill.name)}</span>
          <div>
            <div className="fw-semibold">{bill.name}</div>
            <div className="text-muted small">Bill Period: {bill.period}</div>
          </div>
        </div>
        <span className={statusStyles[bill.status] || "status-pill"}>{bill.status}</span>
      </div>
      <div className="row g-3 mt-2">
        <div className="col-md-3">
          <div className="text-muted small">Previous Reading</div>
          <div className="fw-semibold">{bill.previous}</div>
        </div>
        <div className="col-md-3">
          <div className="text-muted small">Current Reading</div>
          <div className="fw-semibold">{bill.current}</div>
        </div>
        <div className="col-md-3">
          <div className="text-muted small">Units Used</div>
          <div className="fw-semibold">{bill.units}</div>
        </div>
        <div className="col-md-3">
          <div className="text-muted small">Amount</div>
          <div className="fw-semibold text-danger">{formatCurrency(bill.amount)}</div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted small d-flex align-items-center gap-2">
          <Calendar size={14} />
          {isPaid ? bill.current : `Due: ${bill.due}`}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-light border btn-sm">Bill</button>
          {isPaid ? (
            <button className="btn btn-light border btn-sm">Receipt</button>
          ) : (
            <button className="btn btn-primary-soft btn-sm">Pay Now</button>
          )}
        </div>
      </div>
    </div>
  );
}
