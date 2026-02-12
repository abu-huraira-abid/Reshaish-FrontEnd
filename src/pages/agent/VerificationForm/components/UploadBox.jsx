import React from "react";

export default function UploadBox() {
  return (
    <div className="card p-3">
      <div className="fw-semibold mb-3">Upload Verification Photos</div>
      <div className="border rounded p-4 text-center text-muted" style={{ borderStyle: "dashed" }}>
        ⬆
        <div className="fw-semibold mt-2">Click to upload verification photos</div>
        <div className="small">Upload photos of the property during your visit</div>
      </div>
    </div>
  );
}
