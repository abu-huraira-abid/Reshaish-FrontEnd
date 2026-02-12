import React, { useState } from "react";

export default function ScanForm({ onScan }) {
  const [token, setToken] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!token) return;
    onScan(token);
    setToken("");
  };

  return (
    <form className="card p-3" onSubmit={handleSubmit}>
      <div className="fw-semibold mb-2">Simulate scan</div>
      <label className="form-label">Enter token</label>
      <input
        className="form-control mb-3"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="QR-v-201-123456"
      />
      <button className="btn btn-primary-soft" type="submit">
        Check in / Check out
      </button>
    </form>
  );
}
