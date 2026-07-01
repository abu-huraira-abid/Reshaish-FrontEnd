import React, { useEffect, useMemo, useState } from "react";
import { Upload, X } from "lucide-react";
import Stepper from "../../../../components/common/Stepper.jsx";
import TextInput from "../../../../components/forms/TextInput.jsx";
import SelectInput from "../../../../components/forms/SelectInput.jsx";

const steps = ["Basic Info", "Pricing", "Facilities", "Uploads"]; 
const defaultForm = {
  title: "",
  type: "apartment",
  bedrooms: "",
  bathrooms: "",
  area: "",
  city: "",
  address: "",
  rent: "",
  deposit: "",
  description: "",
  ownershipProof: null,
  photos: [],
  existingImages: [],
  existingOwnershipProofUrl: "",
  deleteImageIds: [],
  facilities: []
};

export default function ListingStepForm({
  initialValues = {},
  mode = "create",
  onSubmit
}) {
  const [current, setCurrent] = useState(mode === "edit" ? steps.length - 1 : 0);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ ...defaultForm, ...initialValues });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleFileChange = (event) => {
    const [file] = event.target.files || [];
    setForm((prev) => ({ ...prev, ownershipProof: file || null }));
  };

  const handlePhotosChange = (event) => {
    setForm((prev) => ({
      ...prev,
      photos: [...prev.photos, ...Array.from(event.target.files || [])]
    }));
    event.target.value = "";
  };

  const removeNewPhoto = (index) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, photoIndex) => photoIndex !== index)
    }));
  };

  const removeExistingImage = (image) => {
    setForm((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((item) => item.id !== image.id),
      deleteImageIds: [...prev.deleteImageIds, image.id]
    }));
  };

  const photoPreviews = useMemo(
    () =>
      form.photos.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file)
      })),
    [form.photos]
  );
  const ownershipPreview = useMemo(() => {
    if (!form.ownershipProof || !form.ownershipProof.type.startsWith("image/")) {
      return null;
    }
    return URL.createObjectURL(form.ownershipProof);
  }, [form.ownershipProof]);

  useEffect(
    () => () => {
      photoPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    },
    [photoPreviews]
  );

  useEffect(
    () => () => {
      if (ownershipPreview) URL.revokeObjectURL(ownershipPreview);
    },
    [ownershipPreview]
  );

  const next = () => setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setCurrent((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        facilities: form.facilities || []
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleFacility = (value) => {
    setForm((prev) => {
      const exists = prev.facilities.includes(value);
      return {
        ...prev,
        facilities: exists
          ? prev.facilities.filter((item) => item !== value)
          : [...prev.facilities, value]
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h4 className="mb-3">
        {mode === "edit" ? "Update Listing" : "Create New Listing"}
      </h4>
      <Stepper steps={steps} current={current} onStepClick={setCurrent} />
      <div className="mt-4">
        {current === 0 && (
          <>
            <div className="fw-semibold mb-3">Basic Information</div>
            <TextInput label="Property Title" name="title" value={form.title} onChange={handleChange} />
            <SelectInput
              label="Property Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              options={[
                { value: "apartment", label: "Apartment" },
                { value: "house", label: "House" },
                { value: "room", label: "Room" }
              ]}
            />
            <div className="row g-3">
              <div className="col-md-4">
                <TextInput label="Bedrooms" name="bedrooms" value={form.bedrooms} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <TextInput label="Bathrooms" name="bathrooms" value={form.bathrooms} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <TextInput label="Area (sqft)" name="area" value={form.area} onChange={handleChange} />
              </div>
            </div>
          </>
        )}
        {current === 1 && (
          <>
            <div className="fw-semibold mb-3">Location & Pricing</div>
            <TextInput label="City" name="city" value={form.city} onChange={handleChange} placeholder="Lahore" />
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="address"
                rows={3}
                value={form.address}
                onChange={handleChange}
                placeholder="Enter full address"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="Add property details, nearby landmarks, and rental notes"
              />
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Monthly Rent</label>
                <div className="input-group">
                  <span className="input-group-text">PKR</span>
                  <input
                    className="form-control"
                    name="rent"
                    type="number"
                    value={form.rent}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Security Deposit</label>
                <div className="input-group">
                  <span className="input-group-text">PKR</span>
                  <input
                    className="form-control"
                    name="deposit"
                    type="number"
                    value={form.deposit}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {current === 2 && (
          <>
            <div className="fw-semibold mb-3">Amenities</div>
            <div className="row g-3">
              {["WiFi", "AC", "Parking", "Gym", "Pool", "Security"].map((item) => (
                <div className="col-6 col-md-4" key={item}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`amenity-${item}`}
                      checked={form.facilities.includes(item)}
                      onChange={() => toggleFacility(item)}
                    />
                    <label className="form-check-label" htmlFor={`amenity-${item}`}>
                      {item}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {current === 3 && (
          <>
            <div className="fw-semibold mb-3">Uploads</div>
            <label
              className={`upload-card mb-3 ${
                form.photos.length || form.existingImages.length ? "uploaded" : ""
              }`}
              htmlFor="property-photos"
            >
              <Upload size={28} />
              <div>Upload property photos</div>
            </label>
            <input
              id="property-photos"
              name="photos"
              type="file"
              multiple
              className="d-none"
              onChange={handlePhotosChange}
            />
            {(form.existingImages.length > 0 || photoPreviews.length > 0) && (
              <div className="upload-preview-grid upload-preview-grid-large mb-3">
                {form.existingImages.map((image) => (
                  <div className="upload-preview-item" key={image.id}>
                    <img src={image.url} alt="Existing property" />
                    <button
                      aria-label="Remove existing photo"
                      className="upload-preview-remove"
                      onClick={() => removeExistingImage(image)}
                      type="button"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
                {photoPreviews.map((preview, index) => (
                  <div className="upload-preview-item" key={preview.url}>
                    <img src={preview.url} alt={preview.name} />
                    <button
                      aria-label="Remove selected photo"
                      className="upload-preview-remove"
                      onClick={() => removeNewPhoto(index)}
                      type="button"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {form.photos.length > 0 && (
              <div className="text-muted small mb-3">
                Selected: {form.photos.length} photo{form.photos.length === 1 ? "" : "s"}
              </div>
            )}
            {mode === "edit" && form.existingImages.length > 0 && (
              <div className="text-muted small mb-3">
                Existing photos: {form.existingImages.length}
              </div>
            )}
            <label
              className={`upload-card ${
                form.ownershipProof || form.existingOwnershipProofUrl ? "uploaded" : ""
              }`}
              htmlFor="ownership-proof"
            >
              <Upload size={28} />
              <div>Upload ownership proof</div>
              {ownershipPreview && (
                <img
                  className="upload-proof-preview"
                  src={ownershipPreview}
                  alt={form.ownershipProof.name}
                />
              )}
              {!ownershipPreview && form.existingOwnershipProofUrl && (
                <img
                  className="upload-proof-preview"
                  src={form.existingOwnershipProofUrl}
                  alt="Existing ownership proof"
                />
              )}
            </label>
            <input
              id="ownership-proof"
              name="ownership"
              type="file"
              className="d-none"
              onChange={handleFileChange}
            />
            {form.ownershipProof && (
              <div className="text-muted small mt-2">
                Selected: {form.ownershipProof.name}
              </div>
            )}
            {!form.ownershipProof && form.existingOwnershipProofUrl && (
              <div className="text-muted small mt-2">
                Existing ownership proof
              </div>
            )}
          </>
        )}
      </div>
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-light border px-4 py-2" type="button" onClick={prev} disabled={current === 0}>
          Back
        </button>
        {current < steps.length - 1 ? (
          <button className="btn btn-primary-soft px-5 py-2" type="button" onClick={next}>
            Next
          </button>
        ) : (
          <button className="btn btn-primary-soft px-5 py-2" type="submit" disabled={saving}>
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Submitting...
              </>
            ) : (
              mode === "edit" ? "Update Listing" : "Submit Listing"
            )}
          </button>
        )}
      </div>
    </form>
  );
}
