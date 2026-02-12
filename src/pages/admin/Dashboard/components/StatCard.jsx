import React from "react";

export default function StatCard({ label, value, icon }) {
  return (
    <div className="stat-tile">
      <div className="icon-circle">{icon}</div>
      <div>
        <div className="fw-semibold">{value}</div>
        <div className="text-muted small">{label}</div>
      </div>
    </div>
  );
}
