import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { formatCurrency } from "../../../utils/helpers.js";
import Loading from "../../../components/common/Loading.jsx";
import { fetchListingById } from "../../../services/api/listings.js";
import { createStripeCheckoutSession } from "../../../services/api/payments.js";

export default function InitialPayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
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
      platformFee: Math.round(Number(listing.rent || 0) * 0.3),
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

  const handlePayment = async (event) => {
    event.preventDefault();
    if (processing) return;
    setProcessing(true);
    try {
      const session = await createStripeCheckoutSession({ propertyId: listingId });
      window.location.href = session.checkout_url;
    } catch (error) {
      setProcessing(false);
      window.alert(error.message || "Unable to start Stripe checkout.");
    }
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
        <div className="col-lg-5">
          <div className="card p-4 payment-summary">
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
              <div className="text-muted small mt-1">30% of monthly rent</div>
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

        <div className="col-lg-7">
          <div className="card p-4 p-md-5">
            <div className="fw-semibold mb-2">Stripe Checkout</div>
            <div className="text-muted mb-4">
              Review the payment overview, then continue to Stripe's secure
              checkout page. Card details will be entered on Stripe only.
            </div>

            <form onSubmit={handlePayment}>
              <div className="payment-total mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Stripe Checkout Amount</span>
                  <span className="fw-semibold text-danger">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="pay-terms" required />
                <label className="form-check-label" htmlFor="pay-terms">
                  I agree to continue to Stripe Checkout for {formatCurrency(total)}.
                  I understand that the deposit will be held in escrow until the lease ends.
                </label>
              </div>

              <button className="btn btn-primary-soft w-auto px-4 mt-4" type="submit" disabled={processing}>
                {processing ? (
                  <span className="d-inline-flex align-items-center gap-2">
                    <span className="spinner-border spinner-border-sm" />
                    Creating checkout link...
                  </span>
                ) : (
                  <span className="d-inline-flex align-items-center gap-2">
                    <ShieldCheck size={16} /> Proceed to Stripe Checkout
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
    </div>
  );
}
