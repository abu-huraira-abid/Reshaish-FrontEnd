import React, { useState } from "react";
import SelectInput from "../../../../components/forms/SelectInput.jsx";
import FileUpload from "../../../../components/forms/FileUpload.jsx";

export default function KeyHandoverForm({ onConfirm }) {
  const [method, setMethod] = useState("OTP");

  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirm({ method, timestamp: new Date().toISOString() });
  };

  return (
    <form className="card p-3" onSubmit={handleSubmit}>
      <div className="fw-semibold mb-2">Confirm Key Handover</div>
      <SelectInput
        label="Handover method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        options={[
          { value: "OTP", label: "OTP" },
          { value: "QR", label: "QR" }
        ]}
      />
      <FileUpload label="Optional proof upload" />
      <button className="btn btn-primary-soft" type="submit">
        Confirm handover
      </button>
    </form>
  );
}
