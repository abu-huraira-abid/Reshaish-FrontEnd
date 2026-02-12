import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  CreditCard,
  Lock,
  ShieldCheck,
  Wallet
} from "lucide-react";
import { formatCurrency } from "../../../utils/helpers.js";
import Loading from "../../../components/common/Loading.jsx";
import { fetchListingById } from "../../../services/mock/listings.js";

export default function InitialPayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [listing, setListing] = useState(null);
  const [loadingListing, setLoadingListing] = useState(true);

  const listingId = id || "l-100";

  useEffect(() => {
    setLoadingListing(true);
    fetchListingById(listingId).then((data) => {
      setListing(data || null);
      setLoadingListing(false);
    });
  }, [listingId]);

  if (loadingListing) {
    return <Loading label="Loading payment" />;
  }
  if (!listing) {
    return (
      <div className="card p-4">
        <div className="fw-semibold mb-1">Payment details not available</div>
        <div className="text-muted small">We could not find this property for payment.</div>
      </div>
    );
  }

  const payment = {
    property: {
      title: listing.title,
      location: `${listing.address}, ${listing.city}`,
      image: listing.images[0]
    },
    breakdown: {
      deposit: listing.deposit,
      rent: listing.rent,
      agreementCharges: 2500,
      platformFee: 1500,
      gst: 360
    },
    landlord: {
      name: "Faisal Khan",
      accountLast4: "4532"
    }
  };

  const total =
    payment.breakdown.deposit +
    payment.breakdown.rent +
    payment.breakdown.agreementCharges +
    payment.breakdown.platformFee +
    payment.breakdown.gst;

  const handlePayment = (event) => {
    event.preventDefault();
    if (processing) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowSuccess(true);
    }, 1200);
  };

  return (
    <div>
      <div className="mb-4">
        <button className="btn btn-link px-0 text-muted text-decoration-none mb-3" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <div className="section-title">Initial Payment</div>
        <div className="section-subtitle">Complete your payment to proceed with key handover</div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card p-4 payment-summary sticky-top" style={{ top: "96px" }}>
            <div className="mb-4">
              <img
                src={payment.property.image}
                alt={payment.property.title}
                className="rounded-4 mb-3"
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
              />
              <div className="fw-semibold mb-1">{payment.property.title}</div>
              <div className="text-muted small">{payment.property.location}</div>
            </div>

            <div className="payment-breakdown mb-4">
              <div className="fw-semibold mb-3">Payment Breakdown</div>
              <div className="d-flex justify-content-between text-muted small">
                <span>Security Deposit</span>
                <span>{formatCurrency(payment.breakdown.deposit)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>First Month Rent</span>
                <span>{formatCurrency(payment.breakdown.rent)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>Agreement Charges</span>
                <span>{formatCurrency(payment.breakdown.agreementCharges)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>Platform Fee</span>
                <span>{formatCurrency(payment.breakdown.platformFee)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>GST (18%)</span>
                <span>{formatCurrency(payment.breakdown.gst)}</span>
              </div>
            </div>

            <div className="payment-total mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-semibold">Total Amount</span>
                <span className="fw-semibold text-danger">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="payment-secure">
              <div className="d-flex align-items-center gap-2 mb-2">
                <ShieldCheck size={18} className="text-success" />
                <span className="fw-semibold text-success">Secure Payment</span>
              </div>
              <div className="text-muted small">
                Your payment is encrypted and secure. Money will be held in escrow until key handover.
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card p-4 p-md-5">
            <div className="fw-semibold mb-4">Payment Method</div>

            <div className="row g-3 mb-4">
              {[
                { id: "card", label: "Card", icon: <CreditCard size={26} /> },
                { id: "wallet", label: "Mobile Wallet", icon: <Wallet size={26} /> },
                { id: "netbanking", label: "Bank Transfer", icon: <Building2 size={26} /> }
              ].map((item) => (
                <div className="col-md-4" key={item.id}>
                  <button
                    type="button"
                    className={`payment-method-card w-100 ${method === item.id ? "active" : ""}`}
                    onClick={() => setMethod(item.id)}
                  >
                    <div className={`payment-method-icon ${method === item.id ? "active" : ""}`}>
                      {item.icon}
                    </div>
                    <div className="fw-semibold text-dark">{item.label}</div>
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handlePayment}>
              {method === "card" && (
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Card Number</label>
                    <div className="position-relative">
                      <input className="form-control" placeholder="1234 5678 9012 3456" required />
                      <CreditCard size={16} className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Cardholder Name</label>
                    <input className="form-control" placeholder="Name on card" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Expiry Date</label>
                    <input className="form-control" placeholder="MM/YY" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">CVV</label>
                    <div className="position-relative">
                      <input className="form-control" placeholder="123" required />
                      <Lock size={16} className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                    </div>
                  </div>
                </div>
              )}

              {method === "wallet" && (
                <div className="mb-3">
                  <label className="form-label">Mobile Wallet</label>
                  <input className="form-control" placeholder="e.g., +92 300 1234567" required />
                </div>
              )}

              {method === "netbanking" && (
                <div className="mb-3">
                  <label className="form-label">Select Your Bank</label>
                  <select className="form-select" required>
                    <option value="">Choose a bank</option>
                    <option>Habib Bank Limited</option>
                    <option>United Bank Limited</option>
                    <option>MCB Bank</option>
                    <option>Allied Bank</option>
                    <option>Bank Alfalah</option>
                  </select>
                </div>
              )}

              {method === "card" && (
                <div className="form-check mt-3">
                  <input className="form-check-input" type="checkbox" id="save-card" />
                  <label className="form-check-label" htmlFor="save-card">
                    Save this card for future payments
                  </label>
                </div>
              )}

              <div className="form-check mt-3">
                <input className="form-check-input" type="checkbox" id="pay-terms" required />
                <label className="form-check-label" htmlFor="pay-terms">
                  I authorize Rehaish to deduct {formatCurrency(total)} from my account. I understand that the deposit will be held in escrow until the lease ends.
                </label>
              </div>

              <button className="btn btn-primary-soft w-auto px-4 mx-auto mt-4" type="submit" disabled={processing}>
                {processing ? (
                  <span className="d-inline-flex align-items-center gap-2">
                    <span className="spinner-border spinner-border-sm" />
                    Processing Payment...
                  </span>
                ) : (
                  <span className="d-inline-flex align-items-center gap-2">
                    <Lock size={16} /> Pay {formatCurrency(total)}
                  </span>
                )}
              </button>
            </form>

            <div className="payment-info mt-4">
              <div className="d-flex align-items-start gap-2">
                <CheckCircle2 size={18} className="text-success" />
                <span className="text-muted small">Your payment is protected by 256-bit SSL encryption</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <CheckCircle2 size={18} className="text-success" />
                <span className="text-muted small">Deposit will be refunded within 30 days after lease ends</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <CheckCircle2 size={18} className="text-success" />
                <span className="text-muted small">Funds held in escrow until key handover is completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="modal-backdrop-custom">
          <div className="payment-success-modal">
            <div className="text-center">
              <div className="success-icon">
                <CheckCircle2 size={24} />
              </div>
              <div className="fw-semibold mb-1">Payment Successful!</div>
              <div className="text-muted small mb-3">
                Your payment of {formatCurrency(total)} has been processed successfully.
              </div>

              <div className="success-info mb-3">
                <div className="fw-semibold mb-2">What's Next?</div>
                <div className="d-grid gap-2">
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <CheckCircle2 size={14} className="text-success" />
                    Payment confirmed and recorded
                  </div>
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <CheckCircle2 size={14} className="text-success" />
                    Landlord has been notified
                  </div>
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <CheckCircle2 size={14} className="text-success" />
                    Proceed with key handover
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary-soft w-100"
                onClick={() => navigate(`/tenant/key-handover/${listingId}`)}
              >
                Proceed to Key Handover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
