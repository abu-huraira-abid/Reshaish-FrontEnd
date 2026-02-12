import React from "react";

export default function QrDisplay({ token }) {
  return (
    <div className="card p-4 text-center">
      <div className="text-muted mb-3">Show this QR during your visit</div>
      <img src="/qr-placeholder.svg" alt="QR" className="img-fluid mb-3" />
      <div className="small text-muted">Token</div>
      <div className="fw-semibold">{token}</div>
    </div>
  );
}
