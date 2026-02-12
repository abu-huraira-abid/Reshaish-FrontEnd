import React from "react";

export default function QrSupport() {
  return (
    <div>
      <div className="mb-4">
        <div className="section-title">QR Scanner</div>
        <div className="section-subtitle">Scan tenant QR codes for check-in/check-out.</div>
      </div>
      <div className="card p-5 text-center">
        <div className="text-muted mb-3">Scan tenant QR codes for check-in/check-out</div>
        <div
          style={{
            width: "240px",
            height: "240px",
            margin: "0 auto",
            background: "#e5e7eb",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b"
          }}
        >
          QR Scanner Interface
        </div>
      </div>
    </div>
  );
}
