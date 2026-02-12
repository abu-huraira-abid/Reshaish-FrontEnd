import React from "react";

export default function AuditFilters({ query, onChange }) {
  return (
    <div className="card p-3 mb-3">
      <input
        className="form-control"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by action or actor"
      />
    </div>
  );
}
