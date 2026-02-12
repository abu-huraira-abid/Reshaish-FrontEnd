import React from "react";
import { Check } from "lucide-react";

const defaultAmenities = ["WiFi", "AC", "Parking", "Security", "Gym", "Water Supply"];

export default function AmenitiesCard({ listing }) {
  const amenities = listing.amenities && listing.amenities.length ? listing.amenities : defaultAmenities;

  return (
    <div className="card p-4">
      <div className="fw-semibold mb-3">Amenities</div>
      <div className="row g-2">
        {amenities.map((amenity) => (
          <div className="col-md-4" key={amenity}>
            <div className="d-flex align-items-center gap-2 text-muted small">
              <span className="amenity-check-icon">
                <Check size={12} />
              </span>
              {amenity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
