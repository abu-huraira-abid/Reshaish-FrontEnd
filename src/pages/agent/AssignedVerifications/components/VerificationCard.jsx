import React from "react";
import { CalendarClock, CheckCircle2, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

const priorityStyles = {
  High: "badge-danger",
  Medium: "badge-pending",
  Low: "badge-info"
};

const statusStyles = {
  "Pending Verification": "badge-pending",
  Pending: "badge-pending",
  "In Progress": "badge-info",
  Completed: "badge-verified",
  Verified: "badge-verified"
};

function workflowState(item) {
  if (item.canStartVerification) {
    return {
      icon: CheckCircle2,
      label: "Visit confirmed",
      help: "You can complete the verification report.",
      tone: "verified",
      action: "Start Verification"
    };
  }
  if (item.needsQrConfirmation) {
    return {
      icon: QrCode,
      label: "QR confirmation required",
      help: "Scan the landlord QR code at the property before verification.",
      tone: "pending",
      action: "Confirm QR First"
    };
  }
  return {
    icon: CalendarClock,
    label: "Visit not scheduled",
    help: "Schedule the property visit before opening the verification form.",
    tone: "info",
    action: "Schedule Visit First"
  };
}

export default function VerificationCard({ item }) {
  const navigate = useNavigate();
  const state = workflowState(item);
  const StateIcon = state.icon;

  const handleAction = () => {
    if (item.canStartVerification) {
      navigate(`/agent/verification-form?property=${item.listingId}`);
      return;
    }
    if (item.needsQrConfirmation) {
      navigate("/agent/qr-support");
      return;
    }
    navigate("/agent/visits");
  };

  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between gap-3 flex-wrap">
        <div>
          <div className="fw-semibold">{item.property}</div>
          <div className="text-muted small">{item.city}</div>
          <div className="text-muted small">Landlord: {item.landlord}</div>
        </div>
        <div className="d-flex gap-2 align-items-start flex-wrap">
          <span className={`badge-pill ${priorityStyles[item.priority]}`}>
            {item.priority.toUpperCase()}
          </span>
          <span className={`badge-pill ${statusStyles[item.status] || "badge-info"}`}>
            {item.status}
          </span>
        </div>
      </div>

      <div className={`verification-flow-note ${state.tone}`}>
        <StateIcon size={17} />
        <div>
          <div className="fw-semibold">{state.label}</div>
          <div className="small">{state.help}</div>
        </div>
      </div>

      <div className="d-flex gap-4 mt-3 text-muted small flex-wrap">
        <div>Assigned: {item.assignedDate || "Today"}</div>
        <div className="text-danger">Due: {item.dueDate || "Pending"}</div>
      </div>
      <div className="mt-3 d-flex justify-content-end">
        <button className="btn btn-outline-danger btn-sm" onClick={handleAction} type="button">
          {state.action} →
        </button>
      </div>
    </div>
  );
}
