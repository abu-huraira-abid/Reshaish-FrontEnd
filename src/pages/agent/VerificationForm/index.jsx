import React, { useEffect, useMemo, useState } from "react";
import { CalendarClock, QrCode } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../../components/common/Loading.jsx";
import { fetchAssignedVerifications } from "../../../services/api/agent.js";
import ProgressCard from "./components/ProgressCard.jsx";
import PropertyDetails from "./components/PropertyDetails.jsx";
import DecisionPanel from "./components/DecisionPanel.jsx";
import ChecklistSection from "./components/ChecklistSection.jsx";
import UploadBox from "./components/UploadBox.jsx";

const checklistSections = [
  {
    title: "Condition Verification",
    items: [
      "Overall property condition is good",
      "Walls and ceiling are in good state",
      "Flooring is intact and clean",
      "Windows and doors functioning properly"
    ]
  },
  {
    title: "Facilities Verification",
    items: [
      "Kitchen appliances present and working",
      "Bathroom fixtures functional",
      "Electrical points and wiring safe",
      "Water supply and drainage working"
    ]
  },
  {
    title: "Location Verification",
    items: [
      "Property location matches listing",
      "Neighborhood is safe and accessible",
      "Nearby amenities as described"
    ]
  },
  {
    title: "Photos Verification",
    items: ["Photos match actual property", "All rooms photographed accurately"]
  },
  {
    title: "Documents Verification",
    items: [
      "Ownership documents verified",
      "Tax receipts available",
      "NOC from society/builder (if applicable)"
    ]
  }
];

export default function VerificationForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("property");
  const [loading, setLoading] = useState(true);
  const [verificationItem, setVerificationItem] = useState(null);
  const [checklist, setChecklist] = useState({});
  const [verificationPhoto, setVerificationPhoto] = useState(null);

  useEffect(() => {
    fetchAssignedVerifications()
      .then((items) => {
        setVerificationItem(
          items.find((item) => String(item.listingId) === String(propertyId)) || null
        );
      })
      .finally(() => setLoading(false));
  }, [propertyId]);

  const guard = useMemo(() => {
    if (!propertyId || !verificationItem) {
      return {
        icon: CalendarClock,
        title: "Select a property first",
        message: "Open the verification from your assigned verification list.",
        action: "Back to verifications",
        path: "/agent/verifications"
      };
    }
    if (verificationItem.canStartVerification) return null;
    if (verificationItem.needsQrConfirmation) {
      return {
        icon: QrCode,
        title: "Confirm the visit first",
        message:
          "The visit is scheduled, but the QR code has not been scanned at the property yet.",
        action: "Open QR scanner",
        path: "/agent/qr-support"
      };
    }
    return {
      icon: CalendarClock,
      title: "Schedule the visit first",
      message:
        "A property verification report can only be submitted after the visit is scheduled and confirmed on location.",
      action: "Schedule visit",
      path: "/agent/visits"
    };
  }, [propertyId, verificationItem]);

  const totalChecks = useMemo(
    () => checklistSections.reduce((sum, section) => sum + section.items.length, 0),
    []
  );
  const completedChecks = Object.values(checklist).filter(
    (value) => value === true || value === false
  ).length;
  const progress = Math.round((completedChecks / totalChecks) * 100);

  const handleChecklistChange = (item, value) => {
    setChecklist((prev) => ({
      ...prev,
      [item]: value
    }));
  };

  if (loading) {
    return <Loading label="Checking verification access" />;
  }

  if (guard) {
    const GuardIcon = guard.icon;
    return (
      <div>
        <div className="mb-3">
          <Link className="text-muted" to="/agent/verifications">
            ← Back to Verifications
          </Link>
        </div>
        <div className="card verification-guard-card">
          <div className="verification-guard-icon">
            <GuardIcon size={28} />
          </div>
          <h1>{guard.title}</h1>
          <p>{guard.message}</p>
          <button
            className="btn btn-primary-soft"
            onClick={() => navigate(guard.path)}
            type="button"
          >
            {guard.action}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3">
        <Link className="text-muted" to="/agent/verifications">
          ← Back to Verifications
        </Link>
      </div>
      <div className="mb-4">
        <div className="section-title">Property Verification Checklist</div>
        <div className="section-subtitle">Complete on-ground verification for the listing.</div>
      </div>
      <ProgressCard percent={progress} />
      <div className="row g-4">
        <div className="col-lg-8 d-grid gap-3">
          <PropertyDetails property={verificationItem} />
          {checklistSections.map((section) => (
            <ChecklistSection
              key={section.title}
              title={section.title}
              items={section.items}
              values={checklist}
              onChange={handleChecklistChange}
            />
          ))}
          <UploadBox file={verificationPhoto} onChange={setVerificationPhoto} />
        </div>
        <div className="col-lg-4">
          <DecisionPanel
            checklist={checklist}
            photo={verificationPhoto}
            propertyId={verificationItem.listingId}
            totalChecks={totalChecks}
          />
        </div>
      </div>
    </div>
  );
}
