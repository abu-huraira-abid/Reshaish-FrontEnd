import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrDisplay({ token }) {
  const qrValue =
    token && token !== "Generating..."
      ? `${window.location.origin}/agent/qr-support?token=${encodeURIComponent(token)}`
      : "";

  return (
    <div className="card p-4 text-center">
      <div className="text-muted mb-3">Show this QR during your visit</div>
      <div className="d-flex justify-content-center mb-3">
        {qrValue ? (
          <QRCodeCanvas value={qrValue} size={240} level="M" includeMargin />
        ) : (
          <img src="/qr-placeholder.svg" alt="QR" className="img-fluid" />
        )}
      </div>
      <div className="small text-muted">Token</div>
      <div className="fw-semibold">{token}</div>
    </div>
  );
}
