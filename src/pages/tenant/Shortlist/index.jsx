import React, { useEffect, useState } from "react";
import EmptyState from "../../../components/common/EmptyState.jsx";
import ShortlistCard from "./components/ShortlistCard.jsx";
import { listings } from "../../../services/mock/listings.js";
import { useApp } from "../../../context/AppContext.jsx";

export default function Shortlist() {
  const { favorites, toggleFavorite } = useApp();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(listings.filter((listing) => favorites.includes(listing.id)));
  }, [favorites]);

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Shortlisted Homes</div>
        <div className="section-subtitle">Save listings to compare them later.</div>
      </div>
      {items.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          message="Save listings while browsing to see them here."
        />
      ) : (
        <div className="row g-4">
          {items.map((listing) => (
            <div className="col-md-6 col-xl-4" key={listing.id}>
              <ShortlistCard listing={listing} onRemove={toggleFavorite} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
