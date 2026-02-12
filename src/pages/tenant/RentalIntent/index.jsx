import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IntentCard from "./components/IntentCard.jsx";
import { fetchIntents } from "../../../services/mock/intents.js";

export default function RentalIntent() {
  const [intents, setIntents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIntents().then(setIntents);
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <div className="section-title">Rental Intent</div>
          <div className="section-subtitle">Track your submitted rental intents.</div>
        </div>
        <button className="btn btn-primary-soft" onClick={() => navigate("/tenant/listings")}>
          Submit New Intent
        </button>
      </div>
      <div className="d-grid gap-3">
        {intents.map((intent) => (
          <IntentCard key={intent.id} intent={intent} />
        ))}
      </div>
    </div>
  );
}
