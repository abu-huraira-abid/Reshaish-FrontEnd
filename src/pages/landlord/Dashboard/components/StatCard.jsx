import React from "react";
import { TrendingUp } from "lucide-react";

export default function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="card dashboard-stat-card h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className={`dashboard-stat-icon ${tone}`}>
          <Icon size={20} />
        </div>
        <TrendingUp size={18} className="text-success" />
      </div>
      <div className="dashboard-stat-value">{value}</div>
      <div className="text-muted small">{label}</div>
    </div>
  );
}
