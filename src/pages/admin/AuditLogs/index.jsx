import React, { useEffect, useState } from "react";
import AuditFilters from "./components/AuditFilters.jsx";
import AuditTable from "./components/AuditTable.jsx";
import DataPagination from "../../../components/common/DataPagination.jsx";
import { fetchAuditLogs } from "../../../services/api/admin.js";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchAuditLogs().then(setLogs);
  }, []);

  const filtered = logs.filter((log) =>
    `${log.action} ${log.actor}`.toLowerCase().includes(query.toLowerCase())
  );
  const pagedLogs = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleQueryChange = (value) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Audit Logs</div>
        <div className="section-subtitle">Monitor critical platform events.</div>
      </div>
      <AuditFilters query={query} onChange={handleQueryChange} />
      <AuditTable logs={pagedLogs} />
      {filtered.length > 0 && (
        <DataPagination
          itemLabel="logs"
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
