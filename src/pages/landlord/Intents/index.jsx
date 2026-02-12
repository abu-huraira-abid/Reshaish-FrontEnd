import React, { useEffect, useState } from "react";
import Modal from "../../../components/common/Modal.jsx";
import IntentRow from "./components/IntentRow.jsx";
import { fetchIntents, updateIntentStatus } from "../../../services/mock/intents.js";

const filters = ["all", "pending", "accepted", "rejected"];

export default function Intents() {
  const [intents, setIntents] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [confirmIntent, setConfirmIntent] = useState(null);

  useEffect(() => {
    fetchIntents().then(setIntents);
  }, []);

  const handleReject = async (intent) => {
    const updated = await updateIntentStatus(intent.id, "rejected");
    setIntents((prev) => prev.map((i) => (i.id === intent.id ? updated : i)));
  };

  const handleAccept = (intent) => {
    setConfirmIntent(intent);
  };

  const confirmAccept = async () => {
    if (!confirmIntent) return;
    const updated = await updateIntentStatus(confirmIntent.id, "accepted");
    setIntents((prev) => prev.map((i) => (i.id === confirmIntent.id ? updated : i)));
    setConfirmIntent(null);
  };

  const filtered = intents.filter((intent) =>
    activeFilter === "all" ? true : intent.status === activeFilter
  );

  const counts = {
    all: intents.length,
    pending: intents.filter((i) => i.status === "pending").length,
    accepted: intents.filter((i) => i.status === "accepted").length,
    rejected: intents.filter((i) => i.status === "rejected").length
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Rental Requests</div>
        <div className="section-subtitle">Review and manage rental applications from tenants.</div>
      </div>
      <div className="card p-3 mb-4">
        <div className="pill-tabs">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`pill-tab ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)} ({counts[filter] || 0})
            </button>
          ))}
        </div>
      </div>

      <div className="d-grid gap-4">
        {filtered.map((intent) => (
          <IntentRow key={intent.id} intent={intent} onAccept={handleAccept} onReject={handleReject} />
        ))}
      </div>

      <Modal
        open={Boolean(confirmIntent)}
        title="Accept Rental Request?"
        onClose={() => setConfirmIntent(null)}
        actions={
          <>
            <button className="btn btn-light" onClick={() => setConfirmIntent(null)}>
              Cancel
            </button>
            <button className="btn btn-primary-soft" onClick={confirmAccept}>
              Confirm & Generate
            </button>
          </>
        }
      >
        {confirmIntent && (
          <div className="card-soft p-3">
            <div className="text-muted small">You are accepting</div>
            <div className="fw-semibold">{confirmIntent.property}</div>
            <div className="text-muted small">Tenant: {confirmIntent.tenant.name}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}
