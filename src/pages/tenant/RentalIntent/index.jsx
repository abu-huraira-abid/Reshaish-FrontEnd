import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataPagination from "../../../components/common/DataPagination.jsx";
import IntentCard from "./components/IntentCard.jsx";
import { fetchIntents } from "../../../services/api/intents.js";

export default function RentalIntent() {
  const [intents, setIntents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIntents().then(setIntents);
  }, []);

  const pagedIntents = intents.slice((page - 1) * pageSize, page * pageSize);

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
        {pagedIntents.map((intent) => (
          <IntentCard key={intent.id} intent={intent} />
        ))}
      </div>
      {intents.length > 0 && (
        <DataPagination
          itemLabel="intents"
          page={page}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 20, 50]}
          totalItems={intents.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
}
