import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  Key,
  Lock,
  MapPin,
  QrCode,
  Upload,
} from "lucide-react";
import Loading from "../../../components/common/Loading.jsx";
import { fetchListingById } from "../../../services/mock/listings.js";

export default function KeyHandover() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState("verify");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [success, setSuccess] = useState(false);
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
    return <Loading label="Loading handover" />;
  }

  const handover = {
    property: listing?.title || "Luxury 2BHK in Gulberg",
    location: `${listing?.address || "Gulberg III"}, ${listing?.city || "Lahore"}`,
    addressLine: `Plot No. 45, ${listing?.address || "Gulberg III"}, ${listing?.city || "Lahore"} - 54000`,
    agreementNumber: "AGR-2024-001234",
    moveInDate: "1/14/2025",
    landlord: {
      name: "Faisal Khan",
      phone: "+92 300 1234567",
      email: "faisal.khan@email.com",
    },
    handoverTime: new Date().toLocaleString("en-PK", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    }),
  };

  const updateOtp = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const next = [...otp];
      next[index] = value;
      setOtp(next);
    }
  };

  const steps = [
    {
      id: "payment",
      label: "Payment Verified",
      description: "Payment received successfully",
      icon: CheckCircle2,
    },
    {
      id: "otp",
      label: "OTP Verification",
      description: "Verify handover OTP",
      icon: Lock,
    },
    {
      id: "complete",
      label: "Handover Complete",
      description: "Keys received",
      icon: Key,
    },
  ];

  const currentStepIndex = step === "verify" ? 0 : step === "otp" ? 1 : 2;

  return (
    <div className="handover-wrapper">
      <div className="mb-4">
        <button
          type="button"
          className="btn btn-link p-0 text-decoration-none text-muted d-inline-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="section-title mt-3">Key Handover</div>
        <div className="section-subtitle">
          Complete the key handover process to start your tenancy
        </div>
      </div>

      <div className="card p-3 mb-3">
        <div className="handover-steps">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const status =
              index < currentStepIndex
                ? "completed"
                : index === currentStepIndex
                  ? "active"
                  : "";
            return (
              <React.Fragment key={item.id}>
                <div className={`handover-step ${status}`}>
                  <span className="step-icon p-2">
                    <Icon size={25} />
                  </span>
                  <div>
                    <div className="fw-semibold small">{item.label}</div>
                    <div className="text-muted small">{item.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <span className="handover-connector" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="card p-2 mb-3 handover-property-card">
        <div className="d-flex gap-3 align-items-center flex-wrap">
          <img
            src={listing?.images?.[0]}
            alt={handover.property}
            className="rounded-4"
            style={{ width: "102px", height: "102px", objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <div className="fw-semibold">{handover.property}</div>
            <div className="text-muted small d-flex align-items-center gap-2">
              <MapPin size={14} />
              {handover.location}
            </div>
            <div className="text-muted small">{handover.addressLine}</div>
            <div className="text-muted small mt-2 d-flex flex-wrap gap-3 align-items-center">
          <span className="d-inline-flex align-items-center gap-2">
            <Calendar size={14} />
            Move-in: {handover.moveInDate}
          </span>
          <span>Agreement: {handover.agreementNumber}</span>
        </div>
          </div>
        </div>
      </div>

      {step === "verify" && (
        <div className="card p-4 handover-scan-card">
          <div className="text-center mb-3">
            <div className="handover-icon">
              <QrCode size={50} />
            </div>
            <div className="fw-semibold">Scan QR Code for Handover</div>
            <div className="text-muted small">
              Meet the landlord at the property and scan the QR code to initiate
              key handover
            </div>
          </div>
          <div className="handover-qr-frame mb-3">
            <div className="handover-qr-inner">
              <div className="handover-camera">
                <Upload size={22} />
              </div>
              <div className="text-muted small">
                Position QR code within the frame
              </div>
            </div>
          </div>
          <div className="handover-contact mb-3">
            <div className="fw-semibold">Landlord Contact</div>
            <div className="text-muted small">{handover.landlord.name}</div>
            <div className="text-muted small">{handover.landlord.phone}</div>
            <div className="text-muted small">{handover.landlord.email}</div>
          </div>
          <button
            className="btn btn-primary-soft w-50 mx-auto"
            onClick={() => setStep("otp")}
          >
            <QrCode size={22} className="me-2" />
            QR Code Scanned - Enter OTP
          </button>
        </div>
      )}

      {step === "otp" && (
        <div className="card p-4">
          <div className="text-center mb-4">
            <div className="handover-icon success">
              <Lock size={18} />
            </div>
            <div className="fw-semibold">Enter Handover OTP</div>
            <div className="text-muted small">
              Enter the 6-digit OTP provided by the landlord.
            </div>
          </div>
          <div className="d-flex justify-content-center gap-2 mb-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                className="form-control otp-input"
                value={digit}
                onChange={(event) => updateOtp(index, event.target.value)}
              />
            ))}
          </div>
          <div className="card-soft p-3 mb-3">
            <div className="fw-semibold mb-2">Handover Checklist</div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="check-1"
              />
              <label className="form-check-label" htmlFor="check-1">
                Verified property condition matches agreement
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="check-2"
              />
              <label className="form-check-label" htmlFor="check-2">
                Received all keys (main door, room keys, etc.)
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="check-2"
              />
              <label className="form-check-label" htmlFor="check-3">
                All utilities are functional (water, electricity, gas)
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="check-4"
              />
              <label className="form-check-label" htmlFor="check-4">
                Documented property condition with photos
              </label>
            </div>
          </div>
          <div className="handover-upload mb-3">
            <Upload size={18} className="me-2" /> Upload Property Condition
            Photos
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-light border"
              onClick={() => setStep("verify")}
            >
              Back
            </button>
            <button
              className="btn btn-primary-soft"
              onClick={() => setSuccess(true)}
            >
              <Check size={16} className="me-2" /> Verify and Complete
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="modal-backdrop-custom">
          <div className="handover-success-modal">
            <div className="handover-success-icon">
              <Check size={28} />
            </div>
            <h4 className="mb-2">Key Handover Complete!</h4>
            <p className="text-muted mb-4">
              Congratulations! You have successfully received the keys. Your tenancy has officially started.
            </p>
            <div className="handover-success-card mb-3">
              <div className="fw-semibold mb-2">Handover Details</div>
              <div className="d-flex justify-content-between gap-3 mb-1">
                <span className="text-muted">Property:</span>
                <span className="fw-semibold">{handover.property}</span>
              </div>
              <div className="d-flex justify-content-between gap-3 mb-1">
                <span className="text-muted">Handover Time:</span>
                <span className="fw-semibold">{handover.handoverTime}</span>
              </div>
              <div className="d-flex justify-content-between gap-3">
                <span className="text-muted">Agreement:</span>
                <span className="fw-semibold">{handover.agreementNumber}</span>
              </div>
            </div>
            <div className="handover-success-note mb-4">
              <div className="d-flex align-items-start gap-2">
                <span className="handover-shield">
                  <Check size={16} />
                </span>
                <div>
                  Your security deposit is now held in escrow. It will be refunded within 30 days after lease ends,
                  subject to property inspection.
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary-soft w-100"
              onClick={() => navigate("/tenant/agreement")}
            >
              Go to My Agreements
            </button>
            <button
              className="btn btn-link mt-2 text-muted"
              onClick={() => setSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
