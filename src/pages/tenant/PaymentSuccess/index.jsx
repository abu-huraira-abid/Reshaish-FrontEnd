import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, ReceiptText } from "lucide-react";
import toast from "react-hot-toast";
import { confirmStripeCheckoutSession } from "../../../services/api/payments.js";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("property_id");
  const transactionId = searchParams.get("transaction_id");
  const sessionId = searchParams.get("session_id");
  const [confirming, setConfirming] = useState(Boolean(sessionId));
  const [confirmed, setConfirmed] = useState(!sessionId);
  const [confirmError, setConfirmError] = useState("");

  const confirmPayment = async ({ silent = false, mountedRef } = {}) => {
    if (!sessionId) return;
    setConfirming(true);
    setConfirmError("");
    try {
      await confirmStripeCheckoutSession(sessionId);
      if (mountedRef && !mountedRef.current) return;
      setConfirmed(true);
      if (!silent) {
        toast.success("Payment confirmed. You can proceed to key handover.");
      }
      return true;
    } catch (error) {
      if (mountedRef && !mountedRef.current) return;
      setConfirmed(false);
      setConfirmError(error.message || "Unable to confirm payment.");
      return false;
    } finally {
      if (!mountedRef || mountedRef.current) {
        setConfirming(false);
      }
    }
  };

  useEffect(() => {
    if (!sessionId) return;

    const mountedRef = { current: true };
    const runConfirmation = async () => {
      const ok = await confirmPayment({ silent: true, mountedRef });
      if (mountedRef.current && ok) {
        toast.success("Payment confirmed. You can proceed to key handover.");
      }
    };

    runConfirmation();

    return () => {
      mountedRef.current = false;
    };
  }, [sessionId]);

  return (
    <div className="w-75 mx-auto">
      <div className="card p-4 p-md-5 text-center">
        <div className="success-icon mx-auto mb-3">
          <CheckCircle2 size={26} />
        </div>
        <div className="section-title">Payment Successful</div>
        <div className="section-subtitle mb-4">
          {confirming
            ? "Confirming your Stripe payment with Rehaish..."
            : confirmed
              ? "Stripe confirmed your payment. Rehaish recorded it against this rental flow."
              : "Stripe redirected back, but Rehaish could not confirm the payment yet."}
        </div>

        {confirming && (
          <div className="payment-total mb-4 mx-auto" style={{ maxWidth: 420 }}>
            <span className="spinner-border spinner-border-sm me-2" />
            <span className="fw-semibold">Activating agreement...</span>
          </div>
        )}

        {confirmError && (
          <div className="alert alert-danger text-start mx-auto" style={{ maxWidth: 520 }}>
            {confirmError}
            <button
              className="btn btn-sm btn-outline-danger mt-3 w-100"
              disabled={confirming}
              onClick={() => confirmPayment()}
              type="button"
            >
              {confirming ? "Checking again..." : "Retry Payment Confirmation"}
            </button>
          </div>
        )}

        {transactionId && (
          <div className="payment-total mb-4 mx-auto" style={{ maxWidth: 420 }}>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <ReceiptText size={18} />
              <span className="fw-semibold">Transaction #{transactionId}</span>
            </div>
          </div>
        )}

        <div className="d-flex flex-wrap justify-content-center gap-3">
          {propertyId && (
            <button
              className="btn btn-primary-soft px-4"
              onClick={() => navigate(`/tenant/key-handover/${propertyId}`)}
              disabled={!confirmed || confirming}
              type="button"
            >
              Proceed to Key Handover
            </button>
          )}
          <button
            className="btn btn-light border px-4"
            onClick={() => navigate("/tenant/payment-history")}
            type="button"
          >
            View Payment History
          </button>
        </div>
      </div>
    </div>
  );
}
