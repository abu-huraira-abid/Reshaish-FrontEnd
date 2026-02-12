import React from "react";

export default function SelectInput({ label, options = [], error, ...props }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <select className={`form-select ${error ? "is-invalid" : ""}`} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
