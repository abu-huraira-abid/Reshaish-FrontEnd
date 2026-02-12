import React from "react";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import { formatCurrency } from "../../../../utils/helpers.js";

export default function LandlordPropertyCard({ property }) {
  return (
    <div className="card dashboard-property-card h-100">
      <div className="dashboard-property-image">
        <img src={property.image} alt={property.title} />
        <span className="property-tag">{property.type}</span>
      </div>
      <div className="card-body">
        <div className="fw-semibold">{property.title}</div>
        <div className="listing-location">
          <MapPin size={14} />
          {property.location}
        </div>
        <div className="listing-meta">
          <span><BedDouble size={14} /> {property.beds} Bed</span>
          <span><Bath size={14} /> {property.baths} Bath</span>
          <span><Ruler size={14} /> {property.sqft} sqft</span>
        </div>
        <div className="listing-price">
          {formatCurrency(property.price)} <span>/month</span>
        </div>
      </div>
    </div>
  );
}
