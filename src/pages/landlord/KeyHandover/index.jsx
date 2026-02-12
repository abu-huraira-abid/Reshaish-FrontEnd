import React, { useState } from "react";
import KeyHandoverForm from "./components/KeyHandoverForm.jsx";
import { useApp } from "../../../context/AppContext.jsx";

export default function KeyHandover() {
  const [last, setLast] = useState(null);
  const { addToast } = useApp();

  const handleConfirm = (payload) => {
    setLast(payload);
    addToast("Key handover confirmed", "success");
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Key Handover</div>
        <div className="section-subtitle">Confirm handover with OTP or QR.</div>
      </div>
      <div className="row g-4">
        <div className="col-lg-5">
          <KeyHandoverForm onConfirm={handleConfirm} />
        </div>
        <div className="col-lg-7">
          <div className="card p-3">
            <div className="fw-semibold">Latest record</div>
            {last ? (
              <div className="mt-2">
                <div>Method: {last.method}</div>
                <div>Timestamp: {new Date(last.timestamp).toLocaleString()}</div>
              </div>
            ) : (
              <div className="text-muted">No handover recorded yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
