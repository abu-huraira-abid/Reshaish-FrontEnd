import React from "react";
import { Link } from "react-router-dom";
import { Bath, BedDouble, CheckCircle2, Heart, MapPin, Ruler } from "lucide-react";
import { formatCurrency } from "../../../../utils/helpers.js";
import { useApp } from "../../../../context/AppContext.jsx";

export default function ListingCard({ listing }) {
  const { favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(listing.id);

  return (
    <div className="card listing-card h-100">
      <div className="listing-image">
        <img src={listing.images[0]} alt={listing.title} />
        <span className="verified-badge">
          <CheckCircle2 size={14} />
          Verified
        </span>
        <span className="property-tag">{listing.tag}</span>
        <button
          className={`wishlist-btn ${isFav ? "active" : ""}`}
          onClick={() => toggleFavorite(listing.id)}
          type="button"
          aria-label="Save property"
        >
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="card-body">
        <h6 className="fw-semibold">{listing.title}</h6>
        <div className="listing-location">
          <MapPin size={14} />
          {listing.location}, {listing.city}
        </div>
        <div className="listing-meta">
          <span><BedDouble size={14} /> {listing.beds} Bed</span>
          <span><Bath size={14} /> {listing.baths} Bath</span>
          <span><Ruler size={14} /> {listing.size} sqft</span>
        </div>
        <div className="listing-footer">
          <div className="listing-price">{formatCurrency(listing.rent)} <span>/month</span></div>
          <Link className="btn btn-outline-danger btn-sm text-nowrap" to={`/tenant/listing/${listing.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
