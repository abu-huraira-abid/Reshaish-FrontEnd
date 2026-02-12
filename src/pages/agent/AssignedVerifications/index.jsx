import React, { useEffect, useState } from "react";
import VerificationCard from "./components/VerificationCard.jsx";
import { fetchAssignedVerifications } from "../../../services/mock/agent.js";

const tabs = ["All", "Pending", "In Progress", "Completed"];

export default function AssignedVerifications() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("All");

  useEffect(() => {
    fetchAssignedVerifications().then(setItems);
  }, []);

  const filtered = items.filter((item) => (active === "All" ? true : item.status === active));
  const counts = {
    All: items.length,
    Pending: items.filter((item) => item.status === "Pending").length,
    "In Progress": items.filter((item) => item.status === "In Progress").length,
    Completed: items.filter((item) => item.status === "Completed").length
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Assigned Verifications</div>
        <div className="section-subtitle">Review and verify property listings assigned to you.</div>
      </div>
      <div className="card p-3 mb-4">
        <div className="pill-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pill-tab ${active === tab ? "active" : ""}`}
              onClick={() => setActive(tab)}
            >
              {tab} ({counts[tab] || 0})
            </button>
          ))}
        </div>
      </div>
      <div className="d-grid gap-3">
        {filtered.map((item) => (
          <VerificationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
