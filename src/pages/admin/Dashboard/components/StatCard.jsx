import React from "react";
import { Link } from "react-router-dom";

export default function StatCard({ label, value, icon, to }) {
  const content = (
    <>
      <div className="icon-circle">{icon}</div>
      <div>
        <div className="fw-semibold">{value}</div>
        <div className="text-muted small">{label}</div>
      </div>
    </>
  );

  if (to) {
    return (
      <Link className="stat-tile stat-tile-link" to={to}>
        {content}
      </Link>
    );
  }

  return <div className="stat-tile">{content}</div>;
}
