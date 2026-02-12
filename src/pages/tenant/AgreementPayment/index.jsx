import React, { useState } from "react";
import AgreementPreview from "./components/AgreementPreview.jsx";
import PaymentBreakdown from "./components/PaymentBreakdown.jsx";
import PaymentForm from "./components/PaymentForm.jsx";
import { createPayment } from "../../../services/mock/payments.js";
import { useApp } from "../../../context/AppContext.jsx";

export default function AgreementPayment() {
  const [status, setStatus] = useState("PendingAcceptance");
  const { addToast } = useApp();

  const handlePay = async ({ fail }) => {
    setStatus("PaymentPending");
    const result = await createPayment({ type: "Agreement", amount: 107500, fail });
    if (result.status === "Success") {
      setStatus("Active");
      addToast("Agreement signed and payment successful.", "success");
    } else {
      setStatus("PaymentPending");
      addToast("Payment failed. Try again.", "danger");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Rental Agreement</div>
        <div className="section-subtitle">Review and sign your agreement.</div>
      </div>
      <div className="row g-4">
        <div className="col-lg-4">
          <AgreementPreview />
        </div>
        <div className="col-lg-4">
          <PaymentBreakdown />
        </div>
        <div className="col-lg-4">
          <PaymentForm onPay={handlePay} />
          <div className="card p-3 mt-3">
            <div className="text-muted small">Status</div>
            <div className="fw-semibold">{status}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
