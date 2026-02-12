import React, { useEffect, useState } from "react";
import VisitAssignmentCard from "./components/VisitAssignmentCard.jsx";
import { fetchVisitAssignments } from "../../../services/mock/agent.js";

export default function VisitScheduling() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchVisitAssignments().then(setAssignments);
  }, []);

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Visit Scheduling</div>
        <div className="section-subtitle">Confirm visit slots and assign yourself.</div>
      </div>
      <div className="d-grid gap-3">
        {assignments.map((assignment) => (
          <VisitAssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
}
