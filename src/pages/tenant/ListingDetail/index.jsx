import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingGallery from "./components/ListingGallery.jsx";
import ListingSummary from "./components/ListingSummary.jsx";
import AmenitiesCard from "./components/AmenitiesCard.jsx";
import LocationCard from "./components/LocationCard.jsx";
import ContactNotice from "./components/ContactNotice.jsx";
import RequestVisitCard from "./components/RequestVisitCard.jsx";
import { fetchListingById } from "../../../services/mock/listings.js";
import Loading from "../../../components/common/Loading.jsx";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    fetchListingById(id).then(setListing);
  }, [id]);

  if (!listing) return <Loading label="Loading listing" />;

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Property Details</div>
        <div className="section-subtitle">Verified by on-ground agent.</div>
      </div>
      <div className="row g-4">
        <div className="col-lg-8 d-grid gap-4">
          <ListingGallery listing={listing} />
          <ListingSummary listing={listing} />
          <AmenitiesCard listing={listing} />
          <LocationCard listing={listing} />
          <ContactNotice />
        </div>
        <div className="col-lg-4">
          <RequestVisitCard listingId={listing.id} />
        </div>
      </div>
    </div>
  );
}
