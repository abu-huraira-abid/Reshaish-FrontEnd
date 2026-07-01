import React from "react";
import { Check, X } from "lucide-react";

export default function ChecklistSection({ items, onChange, title, values }) {
  return (
    <div className="card p-3">
      <div className="fw-semibold mb-3">{title}</div>
      <div className="d-grid gap-2">
        {items.map((item) => {
          const value = values[item];
          return (
            <div
              key={item}
              className={`verification-check-row ${
                value === true ? "pass" : value === false ? "fail" : ""
              }`}
            >
              <span>{item}</span>
              <div className="d-flex gap-2">
                <button
                  aria-label={`Mark ${item} as passed`}
                  className={`verification-check-btn ${value === true ? "active pass" : ""}`}
                  onClick={() => onChange(item, true)}
                  type="button"
                >
                  <Check size={15} />
                </button>
                <button
                  aria-label={`Mark ${item} as failed`}
                  className={`verification-check-btn ${value === false ? "active fail" : ""}`}
                  onClick={() => onChange(item, false)}
                  type="button"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
