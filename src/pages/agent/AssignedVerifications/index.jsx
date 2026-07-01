import React, { useEffect, useState } from "react";
import VerificationCard from "./components/VerificationCard.jsx";
import DataPagination from "../../../components/common/DataPagination.jsx";
import { fetchAssignedVerifications } from "../../../services/api/agent.js";

const tabs = ["All", "Pending", "In Progress", "Completed"];

export default function AssignedVerifications() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchAssignedVerifications().then(setItems);
  }, []);

  const filtered = items.filter((item) => (active === "All" ? true : item.status === active));
  const pagedItems = filtered.slice((page - 1) * pageSize, page * pageSize);
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
              onClick={() => {
                setActive(tab);
                setPage(1);
              }}
            >
              {tab} ({counts[tab] || 0})
            </button>
          ))}
        </div>
      </div>
      <div className="d-grid gap-3">
        {pagedItems.map((item) => (
          <VerificationCard key={item.id} item={item} />
        ))}
      </div>
      {filtered.length > 0 && (
        <DataPagination
          itemLabel="verifications"
          page={page}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 20, 50]}
          totalItems={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
}
