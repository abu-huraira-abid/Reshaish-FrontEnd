import React from "react";

const fallbackImages = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop"
];

export default function ListingGallery({ listing }) {
  const images = listing.images && listing.images.length ? listing.images : fallbackImages;
  const gallery = [images[0] || fallbackImages[0], images[1] || fallbackImages[1], images[2] || fallbackImages[2]];

  return (
    <div className="row g-3">
      <div className="col-md-8">
        <img
          src={gallery[0]}
          alt={listing.title}
          className="w-100 rounded-4"
          style={{ height: "320px", objectFit: "cover" }}
        />
      </div>
      <div className="col-md-4">
        <div className="d-grid gap-3">
          {gallery.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${listing.title} ${index + 2}`}
              className="w-100 rounded-4"
              style={{ height: "150px", objectFit: "cover" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
