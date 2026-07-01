import React, { useState } from "react";
import { Bath, BedDouble, CheckCircle2, Clock, Heart, MapPin, Ruler } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../../utils/helpers.js";

export default function PropertyCard({ listing }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const isVerified = listing.status === "Verified";
  const StatusIcon = isVerified ? CheckCircle2 : Clock;

  return (
    <div
      className="card listing-card h-100 listing-card-clickable"
      onClick={() => navigate(`/landlord/listings/${listing.id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter") navigate(`/landlord/listings/${listing.id}`);
      }}
      role="button"
      tabIndex={0}
    >
      <div className="listing-image">
        <img src={listing.images?.[0]} alt={listing.title} />
        <span className={`verified-badge ${isVerified ? "verified" : "pending"}`}>
          <StatusIcon size={14} />
          {listing.status}
        </span>
        <span className="property-tag">{listing.tag}</span>
        <button
          type="button"
          className={`wishlist-btn ${liked ? "active" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            setLiked((prev) => !prev);
          }}
          aria-label="Like property"
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
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
          {/* <button className="btn btn-outline-danger btn-sm text-nowrap" type="button">
            View Details
          </button> */}
        </div>
      </div>
    </div>
  );
}
