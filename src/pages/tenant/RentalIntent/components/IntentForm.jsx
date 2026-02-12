import React, { useState } from "react";

export default function IntentForm({ onSubmit }) {
  const [listingId, setListingId] = useState("l-100");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message) return;
    onSubmit({ listingId, message, tenant: "Demo Tenant" });
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <div className="fw-semibold mb-2">Submit rental intent</div>
      <label className="form-label">Listing ID</label>
      <input className="form-control mb-3" value={listingId} onChange={(e) => setListingId(e.target.value)} />
      <label className="form-label">Message to landlord</label>
      <textarea
        className="form-control mb-3"
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Share your lease term and move-in date."
      />
      <button className="btn btn-primary-soft" type="submit">
        Submit intent
      </button>
    </form>
  );
}
