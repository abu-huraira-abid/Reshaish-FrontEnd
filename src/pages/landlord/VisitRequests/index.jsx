import React, { useEffect, useState } from "react";
import VisitRequestRow from "./components/VisitRequestRow.jsx";
import DataPagination from "../../../components/common/DataPagination.jsx";
import { fetchVisitRequests, updateVisitStatus } from "../../../services/api/visits.js";
import { useApp } from "../../../context/AppContext.jsx";

export default function VisitRequests() {
  const [visits, setVisits] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { addToast } = useApp();

  useEffect(() => {
    fetchVisitRequests().then(setVisits);
  }, []);

  const handleAction = async (id, status) => {
    const updated = await updateVisitStatus(id, status);
    setVisits((prev) => prev.map((v) => (v.id === id ? updated : v)));
    addToast(`Visit ${status}`, "success");
  };

  const pagedVisits = visits.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Visit Requests</div>
        <div className="section-subtitle">Approve or decline tenant visit requests.</div>
      </div>
      <div className="d-grid gap-3">
        {pagedVisits.map((visit) => (
          <VisitRequestRow key={visit.id} visit={visit} onAction={handleAction} />
        ))}
      </div>
      {visits.length > 0 && (
        <DataPagination
          itemLabel="visits"
          page={page}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 20, 50]}
          totalItems={visits.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
}
