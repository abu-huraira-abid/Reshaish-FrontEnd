import React from "react";
import { ExternalLink, MapPin } from "lucide-react";

export default function LocationCard({ listing }) {
  const query = [listing.address, listing.city].filter(Boolean).join(", ");
  const encodedQuery = encodeURIComponent(query || listing.location || listing.title);
  const mapUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const openMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
        <div>
          <div className="fw-semibold mb-2">Location</div>
          <div className="text-muted d-flex align-items-center gap-2">
            <MapPin size={16} />
            {query}
          </div>
        </div>
        <a
          className="btn btn-light border btn-sm map-open-link"
          href={openMapUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLink size={14} />
          Open map
        </a>
      </div>
      <div className="listing-map-frame">
        <iframe
          src={mapUrl}
          title={`${listing.title} map`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
