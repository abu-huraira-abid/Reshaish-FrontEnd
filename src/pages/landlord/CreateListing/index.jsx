import React from "react";
import ListingStepForm from "./components/ListingStepForm.jsx";
import { submitListing } from "../../../services/api/landlord.js";
import { useApp } from "../../../context/AppContext.jsx";

export default function CreateListing() {
  const { addToast } = useApp();

  const handleSubmit = async (payload) => {
    try {
      await submitListing(payload);
      addToast("Listing submitted for verification", "success");
    } catch (error) {
      addToast(error.message || "Unable to submit listing.", "danger");
      throw error;
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: "900px" }}>
        <ListingStepForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
