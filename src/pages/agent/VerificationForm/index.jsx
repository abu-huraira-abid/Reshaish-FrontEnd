import React from "react";
import { Link } from "react-router-dom";
import ProgressCard from "./components/ProgressCard.jsx";
import PropertyDetails from "./components/PropertyDetails.jsx";
import DecisionPanel from "./components/DecisionPanel.jsx";
import ChecklistSection from "./components/ChecklistSection.jsx";
import UploadBox from "./components/UploadBox.jsx";

export default function VerificationForm() {
  return (
    <div>
      <div className="mb-3">
        <Link className="text-muted" to="/agent/verifications">← Back to Verifications</Link>
      </div>
      <div className="mb-4">
        <div className="section-title">Property Verification Checklist</div>
        <div className="section-subtitle">Complete on-ground verification for the listing.</div>
      </div>
      <ProgressCard percent={0} />
      <div className="row g-4">
        <div className="col-lg-8 d-grid gap-3">
          <PropertyDetails />
          <ChecklistSection
            title="Condition Verification"
            items={[
              "Overall property condition is good",
              "Walls and ceiling are in good state",
              "Flooring is intact and clean",
              "Windows and doors functioning properly"
            ]}
          />
          <ChecklistSection
            title="Facilities Verification"
            items={[
              "Kitchen appliances present and working",
              "Bathroom fixtures functional",
              "Electrical points and wiring safe",
              "Water supply and drainage working"
            ]}
          />
          <ChecklistSection
            title="Location Verification"
            items={[
              "Property location matches listing",
              "Neighborhood is safe and accessible",
              "Nearby amenities as described"
            ]}
          />
          <ChecklistSection
            title="Photos Verification"
            items={["Photos match actual property", "All rooms photographed accurately"]}
          />
          <ChecklistSection
            title="Documents Verification"
            items={[
              "Ownership documents verified",
              "Tax receipts available",
              "NOC from society/builder (if applicable)"
            ]}
          />
          <UploadBox />
        </div>
        <div className="col-lg-4">
          <DecisionPanel />
        </div>
      </div>
    </div>
  );
}
