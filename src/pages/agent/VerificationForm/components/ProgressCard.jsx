import React from "react";

export default function ProgressCard({ percent = 0 }) {
  return (
    <div className="card p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="fw-semibold">Verification Progress</div>
        <div className="text-danger fw-semibold">{percent}%</div>
      </div>
      <div className="progress" style={{ height: "6px" }}>
        <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
