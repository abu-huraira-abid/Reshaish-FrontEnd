import React from "react";
import { Calendar, Download, Droplet, Eye, Flame, Home, Wifi, Zap } from "lucide-react";
import { formatCurrency } from "../../../../utils/helpers.js";

const iconMap = (description) => {
  if (description.includes("Rent")) return <Home size={16} />;
  if (description.includes("Electricity")) return <Zap size={16} />;
  if (description.includes("Water")) return <Droplet size={16} />;
  if (description.includes("Internet")) return <Wifi size={16} />;
  if (description.includes("Gas")) return <Flame size={16} />;
  return <Home size={16} />;
};

export default function PaymentTable({ items }) {
  return (
    <div className="card payment-table">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="fw-semibold">{item.id}</div>
                  <div className="text-muted small">Receipt: {item.receipt || "-"}</div>
                </td>
                <td>
                  <div className="payment-desc">
                    <span className="desc-icon">{iconMap(item.description)}</span>
                    <div>
                      <div className="fw-semibold">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-muted small d-flex align-items-center gap-2">
                    <Calendar size={14} />
                    {new Date(item.date).toLocaleDateString("en-US")}
                  </div>
                </td>
                <td className="text-danger fw-semibold">{formatCurrency(item.amount)}</td>
                <td>
                  <span className="method-pill">{item.method}</span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="icon-btn" type="button" aria-label="View">
                      <Eye size={16} />
                    </button>
                    <button className="icon-btn" type="button" aria-label="Download">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
