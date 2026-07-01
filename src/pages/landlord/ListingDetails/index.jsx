import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading.jsx";
import { useApp } from "../../../context/AppContext.jsx";
import {
  fetchMyListing,
  updateListing
} from "../../../services/api/landlord.js";
import ListingStepForm from "../CreateListing/components/ListingStepForm.jsx";

function toFormValues(listing) {
  return {
    title: listing.title || "",
    type: listing.property_type || "apartment",
    bedrooms: listing.beds || "",
    bathrooms: listing.baths || "",
    area: listing.size || "",
    city: listing.city || "",
    address: listing.address || listing.location || "",
    rent: listing.rent || "",
    deposit: listing.deposit || "",
    description: listing.description || "",
    facilities: listing.facilities || [],
    existingImages: listing.imageRecords || [],
    existingOwnershipProofUrl: listing.ownershipProofUrl || ""
  };
}

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useApp();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyListing(id)
      .then(setListing)
      .catch((error) => {
        addToast(error.message || "Unable to load listing.", "danger");
        navigate("/landlord/listings");
      })
      .finally(() => setLoading(false));
  }, [addToast, id, navigate]);

  const handleSubmit = async (payload) => {
    try {
      const updated = await updateListing(id, payload);
      setListing(updated);
      addToast("Listing updated successfully.", "success");
      navigate("/landlord/listings");
    } catch (error) {
      addToast(error.message || "Unable to update listing.", "danger");
      throw error;
    }
  };

  if (loading) {
    return <Loading label="Loading listing details" />;
  }

  if (!listing) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: "900px" }}>
        <div className="mb-4">
          <div className="section-title">Listing Details</div>
          <div className="section-subtitle">
            {listing.lockedForEditing
              ? "This property is locked because the rental agreement flow has started."
              : "Review and update your property information."}
          </div>
        </div>
        {listing.lockedForEditing ? (
          <div className="card p-4">
            <div className="fw-semibold mb-2">Editing disabled</div>
            <div className="text-muted">
              The landlord has accepted a rental intent or the property is already rented.
              Property details can no longer be changed for this listing.
            </div>
            <button
              className="btn btn-primary-soft mt-3"
              onClick={() => navigate("/landlord/listings")}
              type="button"
            >
              Back to listings
            </button>
          </div>
        ) : (
          <ListingStepForm
            initialValues={toFormValues(listing)}
            mode="edit"
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
