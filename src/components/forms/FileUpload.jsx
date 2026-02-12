import React from "react";

export default function FileUpload({ label, helper, ...props }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input className="form-control" type="file" {...props} />
      {helper && <div className="form-text">{helper}</div>}
    </div>
  );
}
