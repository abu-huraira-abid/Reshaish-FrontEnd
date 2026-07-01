import React from "react";
import { Check, Minus } from "lucide-react";

const defaultAmenities = [
  "WiFi",
  "AC",
  "Parking",
  "Security",
  "Gym",
  "Water Supply",
  "Kitchen",
  "Laundry",
  "Furnished",
  "Elevator",
  "Backup Power",
  "CCTV"
];

export default function AmenitiesCard({ listing }) {
  const availableAmenities = new Set(
    (listing.amenities || []).map((amenity) => String(amenity).toLowerCase())
  );

  return (
    <div className="card p-4">
      <div className="fw-semibold mb-3">Amenities</div>
      <div className="row g-2">
        {defaultAmenities.map((amenity) => {
          const available = availableAmenities.has(amenity.toLowerCase());
          return (
          <div className="col-md-4" key={amenity}>
            <div className={`amenity-chip ${available ? "available" : "unavailable"}`}>
              <span>
                {available ? <Check size={13} /> : <Minus size={13} />}
              </span>
              {amenity}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
