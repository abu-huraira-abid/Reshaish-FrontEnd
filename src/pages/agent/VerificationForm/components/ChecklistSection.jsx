import React from "react";

export default function ChecklistSection({ title, items }) {
  return (
    <div className="card p-3">
      <div className="fw-semibold mb-3">{title}</div>
      <div className="d-grid gap-2">
        {items.map((item) => (
          <div key={item} className="d-flex justify-content-between align-items-center border rounded p-3">
            <span>{item}</span>
            <div className="d-flex gap-2">
              <button className="btn btn-light border btn-sm">✔</button>
              <button className="btn btn-light border btn-sm">✖</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
