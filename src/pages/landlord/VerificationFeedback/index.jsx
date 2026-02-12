import React, { useEffect, useState } from "react";
import ReportCard from "./components/ReportCard.jsx";
import { fetchVerificationFeedback } from "../../../services/mock/landlord.js";

export default function VerificationFeedback() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchVerificationFeedback().then(setReports);
  }, []);

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Verification Feedback</div>
        <div className="section-subtitle">Review agent reports and decisions.</div>
      </div>
      <div className="d-grid gap-3">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}
