import React from "react";

export default function AuditTable({ logs }) {
  return (
    <div className="card p-3">
      <div className="table-responsive">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>Action</th>
              <th>Actor</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.action}</td>
                <td>{log.actor}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
