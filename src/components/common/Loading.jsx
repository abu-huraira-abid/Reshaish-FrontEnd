import React from "react";

export default function Loading({ label = "Loading..." }) {
  return (
    <div className="d-flex align-items-center gap-2 text-muted">
      <span className="spinner-border spinner-border-sm" role="status" />
      <span>{label}</span>
    </div>
  );
}
