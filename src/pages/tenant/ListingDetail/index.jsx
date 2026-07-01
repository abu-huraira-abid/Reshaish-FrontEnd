import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingGallery from "./components/ListingGallery.jsx";
import ListingSummary from "./components/ListingSummary.jsx";
import AmenitiesCard from "./components/AmenitiesCard.jsx";
import LocationCard from "./components/LocationCard.jsx";
import ContactNotice from "./components/ContactNotice.jsx";
import RequestVisitCard from "./components/RequestVisitCard.jsx";
import { fetchListingById } from "../../../services/api/listings.js";
import { apiClient, unwrapData } from "../../../services/api/client.js";
import Loading from "../../../components/common/Loading.jsx";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [activeTenancy, setActiveTenancy] = useState(null);
  const [inProcessAgreement, setInProcessAgreement] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadDetail = async () => {
      const [listingData, tenancyData, agreementData] = await Promise.all([
        fetchListingById(id),
        apiClient
          .get("/rental-tenancies/")
          .then(unwrapData)
          .catch(() => []),
        apiClient
          .get("/agreements/")
          .then(unwrapData)
          .catch(() => [])
      ]);

      if (!mounted) return;

      setListing(listingData);
      setActiveTenancy(
        tenancyData.find(
          (tenancy) =>
            String(tenancy.property) === String(id) &&
            ["active", "notice_given"].includes(tenancy.status)
        ) || null
      );
      setInProcessAgreement(
        agreementData.find(
          (agreement) =>
            String(agreement.property) === String(id) &&
            ["pending_acceptance", "payment_pending"].includes(agreement.status)
        ) || null
      );
    };

    loadDetail();

    return () => {
      mounted = false;
    };
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
          <RequestVisitCard
            activeTenancy={activeTenancy}
            inProcessAgreement={inProcessAgreement}
            listingId={listing.id}
          />
        </div>
      </div>
    </div>
  );
}
