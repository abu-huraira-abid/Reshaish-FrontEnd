import React, { useState } from "react";

export default function PaymentForm({ onPay }) {
  const [accepted, setAccepted] = useState(false);
  const [fail, setFail] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!accepted) return;
    onPay({ fail });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <div className="fw-semibold mb-2">Agreement Acceptance</div>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          id="acceptCheck"
        />
        <label className="form-check-label" htmlFor="acceptCheck">
          I have read and accept the terms & conditions.
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={fail}
          onChange={(e) => setFail(e.target.checked)}
          id="failCheck"
        />
        <label className="form-check-label" htmlFor="failCheck">
          Simulate payment failure
        </label>
      </div>
      <button className="btn btn-primary-soft w-100" type="submit">
        Sign Agreement
      </button>
    </form>
  );
}
