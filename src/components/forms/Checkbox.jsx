import React from "react";

export default function Checkbox({ label, ...props }) {
  return (
    <div className="form-check mb-3">
      <input className="form-check-input" type="checkbox" {...props} />
      {label && <label className="form-check-label">{label}</label>}
    </div>
  );
}
