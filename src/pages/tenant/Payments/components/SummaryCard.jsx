import React from "react";

export default function SummaryCard({ label, value, icon, tone, trend }) {
  return (
    <div className="card summary-card">
      <div className="summary-top">
        <span className="summary-icon" style={{ background: tone }}>{icon}</span>
        {trend && <span className="summary-trend">{trend}</span>}
      </div>
      <div className="summary-value">{value}</div>
      <div className="text-muted small">{label}</div>
    </div>
  );
}
