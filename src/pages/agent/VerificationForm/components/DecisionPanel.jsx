import React, { useState } from "react";
import { CheckCircle2, FileText, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { submitVerificationReport } from "../../../../services/api/agent.js";

const decisions = [
  {
    value: "verified",
    label: "Verified",
    description: "Property meets all criteria",
    icon: CheckCircle2
  },
  {
    value: "rejected",
    label: "Rejected",
    description: "Property fails verification",
    icon: XCircle
  },
  {
    value: "need_evidence",
    label: "Need More Evidence",
    description: "Requires additional information",
    icon: FileText
  }
];

export default function DecisionPanel({ checklist, photo, propertyId, totalChecks }) {
  const navigate = useNavigate();
  const [decision, setDecision] = useState("verified");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!propertyId) {
      toast.error("Property was not found for this verification.");
      return;
    }
    const completedChecks = Object.values(checklist || {}).filter(
      (value) => value === true || value === false
    ).length;
    if (completedChecks < totalChecks) {
      toast.error("Complete all checklist items before submitting.");
      return;
    }
    if (!photo) {
      toast.error("Upload at least one verification photo.");
      return;
    }

    setSaving(true);
    try {
      await submitVerificationReport({
        listingId: propertyId,
        decision,
        notes,
        checklist: {
          visit_confirmed: true,
          decision_selected: decision,
          items: checklist
        },
        photo
      });
      toast.success("Verification report submitted.");
      navigate("/agent/verifications");
    } catch (error) {
      toast.error(error.message || "Unable to submit verification report.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card p-3">
      <div className="fw-semibold mb-3">Verification Decision</div>
      <div className="d-grid gap-2">
        {decisions.map((item) => {
          const Icon = item.icon;
          const active = decision === item.value;
          return (
            <button
              className={`verification-decision-btn ${active ? "active" : ""}`}
              key={item.value}
              onClick={() => setDecision(item.value)}
              type="button"
            >
              <Icon size={18} />
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-3">
        <label className="form-label">Verification Report Notes</label>
        <textarea
          className="form-control"
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Add detailed notes about your verification..."
          rows="4"
          value={notes}
        />
      </div>
      <button
        className="btn btn-primary-soft w-100 mt-3"
        disabled={saving}
        onClick={handleSubmit}
        type="button"
      >
        {saving ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" />
            Submitting...
          </>
        ) : (
          "Submit Verification Report"
        )}
      </button>
    </div>
  );
}
