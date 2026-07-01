import React from "react";

export default function ActivityCard({ title, items, statusTone }) {
  return (
    <div className="card dashboard-activity-card h-100">
      <div className="fw-semibold mb-3">{title}</div>
      <div className="d-grid gap-2">
        {items.length === 0 && (
          <div className="text-muted small">No recent activity yet.</div>
        )}
        {items.map((item) => (
          <div key={item.id} className="dashboard-activity-item">
            <div>
              <div className="fw-semibold">{item.title || item.amount}</div>
              <div className="text-muted small">{item.subtitle}</div>
            </div>
            <span className={`status-pill ${statusTone}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
