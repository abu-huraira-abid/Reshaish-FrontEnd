import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bath, BedDouble, CheckCircle2, Heart, MapPin, Ruler } from "lucide-react";
import { listings } from "../../../../services/mock/listings.js";
import { formatCurrency } from "../../../../utils/helpers.js";

export default function FeaturedProperties() {
  const featured = listings.slice(0, 4);
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className="section-spacer featured-section" id="featured">
      <div className="container container-wide">
        <div className="mb-4">
          <div className="section-title">Featured Properties</div>
          <div className="section-subtitle">Handpicked properties verified by our team</div>
        </div>
        <div className="row g-4">
          {featured.map((listing) => {
            const isFavorite = favorites.has(listing.id);
            return (
              <div className="col-md-6 col-xl-3" key={listing.id}>
                <div className="property-card h-100">
                  <div className="property-image">
                    <img src={listing.images[0]} alt={listing.title} />
                    <span className="verified-badge">
                      <CheckCircle2 size={14} />
                      Verified
                    </span>
                    <span className="property-tag">{listing.tag}</span>
                    <button
                      className={`wishlist-btn ${isFavorite ? "active" : ""}`}
                      type="button"
                      aria-label="Save property"
                      aria-pressed={isFavorite}
                      onClick={() => toggleFavorite(listing.id)}
                    >
                      <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="property-body">
                    <div className="property-title">{listing.title}</div>
                    <div className="property-location">
                      <MapPin size={14} />
                      {listing.location}, {listing.city}
                    </div>
                    <div className="property-meta">
                      <span><BedDouble size={14} /> {listing.beds} Bed</span>
                      <span><Bath size={14} /> {listing.baths} Bath</span>
                      <span><Ruler size={14} /> {listing.size} sqft</span>
                    </div>
                    <div className="property-footer">
                      <div className="property-price">
                        {formatCurrency(listing.rent)}
                        <span>/month</span>
                      </div>
                      <Link
                        className="btn btn-outline-danger btn-sm text-nowrap mx-auto"
                        to={`/tenant/listing/${listing.id}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
