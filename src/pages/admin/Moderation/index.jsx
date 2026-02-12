import React, { useEffect, useState } from "react";
import ModerationRow from "./components/ModerationRow.jsx";
import { fetchModerationListings } from "../../../services/mock/admin.js";
import { useApp } from "../../../context/AppContext.jsx";

export default function Moderation() {
  const [listings, setListings] = useState([]);
  const { addToast } = useApp();

  useEffect(() => {
    fetchModerationListings().then(setListings);
  }, []);

  const handleAction = (id, status) => {
    setListings((prev) => prev.map((listing) => (listing.id === id ? { ...listing, status } : listing)));
    addToast(`Listing ${status}`, "success");
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Listing Moderation</div>
        <div className="section-subtitle">Override approvals and rejections.</div>
      </div>
      <div className="d-grid gap-3">
        {listings.map((listing) => (
          <ModerationRow key={listing.id} listing={listing} onAction={handleAction} />
        ))}
      </div>
    </div>
  );
}
