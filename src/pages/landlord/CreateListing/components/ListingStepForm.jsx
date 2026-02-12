import React, { useState } from "react";
import { Upload } from "lucide-react";
import Stepper from "../../../../components/common/Stepper.jsx";
import TextInput from "../../../../components/forms/TextInput.jsx";
import SelectInput from "../../../../components/forms/SelectInput.jsx";

const steps = ["Basic Info", "Pricing", "Facilities", "Uploads"]; 

export default function ListingStepForm({ onSubmit }) {
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({
    title: "",
    type: "Studio",
    bedrooms: "",
    bathrooms: "",
    area: "",
    address: "",
    rent: "",
    deposit: "",
    facilities: []
  });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const next = () => setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setCurrent((prev) => Math.max(prev - 1, 0));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      facilities: form.facilities || []
    });
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
      <h4 className="mb-3">Create New Listing</h4>
      <Stepper steps={steps} current={current} />
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
                { value: "Studio", label: "Studio" },
                { value: "Apartment", label: "Apartment" },
                { value: "Villa", label: "Villa" }
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
            <label className="upload-card mb-3" htmlFor="property-photos">
              <Upload size={28} />
              <div>Upload property photos</div>
            </label>
            <input
              id="property-photos"
              name="photos"
              type="file"
              multiple
              className="d-none"
            />
            <label className="upload-card" htmlFor="ownership-proof">
              <Upload size={28} />
              <div>Upload ownership proof</div>
            </label>
            <input
              id="ownership-proof"
              name="ownership"
              type="file"
              className="d-none"
            />
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
          <button className="btn btn-primary-soft px-5 py-2" type="submit">
            Submit Listing
          </button>
        )}
      </div>
    </form>
  );
}
