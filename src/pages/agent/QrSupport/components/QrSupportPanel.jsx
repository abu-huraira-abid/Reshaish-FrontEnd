import React, { useState } from "react";
import TextInput from "../../../../components/forms/TextInput.jsx";

export default function QrSupportPanel({ onCheck }) {
  const [token, setToken] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!token) return;
    onCheck(token);
    setToken("");
  };

  return (
    <form className="card p-3" onSubmit={handleSubmit}>
      <h6 className="mb-2">QR Support</h6>
      <TextInput
        label="Scan tenant or agent token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button className="btn btn-primary-soft" type="submit">
        Validate token
      </button>
    </form>
  );
}
