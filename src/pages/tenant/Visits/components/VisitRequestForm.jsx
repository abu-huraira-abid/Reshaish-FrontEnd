import React, { useState } from "react";

export default function VisitRequestForm({ onSubmit }) {
  const [slot1, setSlot1] = useState("");
  const [slot2, setSlot2] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const slots = [slot1, slot2].filter(Boolean);
    if (slots.length === 0) return;
    onSubmit(slots);
    setSlot1("");
    setSlot2("");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <div className="fw-semibold mb-2">Request a visit</div>
      <div className="mb-3">
        <label className="form-label">Preferred slot 1</label>
        <input className="form-control" value={slot1} onChange={(e) => setSlot1(e.target.value)} placeholder="Mar 18, 11:00" />
      </div>
      <div className="mb-3">
        <label className="form-label">Preferred slot 2</label>
        <input className="form-control" value={slot2} onChange={(e) => setSlot2(e.target.value)} placeholder="Mar 18, 15:00" />
      </div>
      <button className="btn btn-primary-soft" type="submit">
        Submit request
      </button>
    </form>
  );
}
