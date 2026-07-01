import React, { useEffect, useState } from "react";

const fallbackImages = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop"
];

export default function ListingGallery({ listing }) {
  const images = listing.images && listing.images.length ? listing.images : fallbackImages;
  const [activeImage, setActiveImage] = useState(images[0] || fallbackImages[0]);

  useEffect(() => {
    setActiveImage(images[0] || fallbackImages[0]);
  }, [images]);

  return (
    <div className="listing-gallery">
      <div className="listing-gallery-main">
        <img
          src={activeImage}
          alt={listing.title}
        />
      </div>

      <div className="listing-gallery-thumbs" aria-label="Property photos">
        {images.map((image, index) => (
          <button
            className={`listing-gallery-thumb ${activeImage === image ? "active" : ""}`}
            key={`${image}-${index}`}
            onClick={() => setActiveImage(image)}
            type="button"
          >
            <img
              src={image}
              alt={`${listing.title} photo ${index + 1}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
