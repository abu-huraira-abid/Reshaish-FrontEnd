import React, { useEffect, useState } from "react";
import VisitRequestRow from "./components/VisitRequestRow.jsx";
import { fetchVisitRequests, updateVisitStatus } from "../../../services/mock/visits.js";
import { useApp } from "../../../context/AppContext.jsx";

export default function VisitRequests() {
  const [visits, setVisits] = useState([]);
  const { addToast } = useApp();

  useEffect(() => {
    fetchVisitRequests().then(setVisits);
  }, []);

  const handleAction = async (id, status) => {
    const updated = await updateVisitStatus(id, status);
    setVisits((prev) => prev.map((v) => (v.id === id ? updated : v)));
    addToast(`Visit ${status}`, "success");
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Visit Requests</div>
        <div className="section-subtitle">Approve or decline tenant visit requests.</div>
      </div>
      <div className="d-grid gap-3">
        {visits.map((visit) => (
          <VisitRequestRow key={visit.id} visit={visit} onAction={handleAction} />
        ))}
      </div>
    </div>
  );
}
