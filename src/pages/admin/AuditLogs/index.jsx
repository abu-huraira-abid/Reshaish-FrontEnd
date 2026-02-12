import React, { useEffect, useState } from "react";
import AuditFilters from "./components/AuditFilters.jsx";
import AuditTable from "./components/AuditTable.jsx";
import { fetchAuditLogs } from "../../../services/mock/admin.js";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchAuditLogs().then(setLogs);
  }, []);

  const filtered = logs.filter((log) =>
    `${log.action} ${log.actor}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Audit Logs</div>
        <div className="section-subtitle">Monitor critical platform events.</div>
      </div>
      <AuditFilters query={query} onChange={setQuery} />
      <AuditTable logs={filtered} />
    </div>
  );
}
