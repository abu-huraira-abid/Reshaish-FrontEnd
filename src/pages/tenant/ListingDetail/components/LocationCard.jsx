import React from "react";
import { MapPin } from "lucide-react";

export default function LocationCard({ listing }) {
  return (
    <div className="card p-4">
      <div className="fw-semibold mb-3">Location</div>
      <div className="text-muted d-flex align-items-center gap-2 mb-3">
        <MapPin size={16} />
        {listing.address}, {listing.city}
      </div>
      <div className="rounded-4 bg-light d-flex align-items-center justify-content-center" style={{ height: "220px" }}>
        <span className="text-muted">Map Placeholder</span>
      </div>
    </div>
  );
}
