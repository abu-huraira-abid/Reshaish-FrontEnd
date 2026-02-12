import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  Check,
  DollarSign,
  FileText,
  Home,
  MapPin,
  Phone,
  Upload,
  User
} from "lucide-react";
import { fetchListingById } from "../../../services/mock/listings.js";
import Loading from "../../../components/common/Loading.jsx";
import { formatCurrency } from "../../../utils/helpers.js";

export default function SubmitRentalIntent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    fetchListingById(id).then(setListing);
  }, [id]);

  if (!listing) return <Loading label="Loading property" />;

  const total = listing.deposit + listing.rent + 2500;

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/tenant/agreement-preview/${id || listing.id}`);
  };

  return (
    <div className="w-75 mx-auto">
      <div className="mb-4">
        <button
          className="btn btn-link px-0 text-muted text-decoration-none mb-3"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>
        <div className="section-title">Submit Rental Intent</div>
        <div className="section-subtitle">Complete your rental application for this property</div>
      </div>

      <div className="card p-4 mb-4">
        <div className="d-flex gap-3 align-items-center flex-wrap">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="rounded-4"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <div className="fw-semibold mb-2">{listing.title}</div>
            <div className="text-muted small d-flex align-items-center gap-2 mb-3">
              <MapPin size={14} />
              {listing.address}, {listing.city}
            </div>
            <div className="d-flex flex-wrap gap-4">
              <div>
                <div className="text-muted small">Monthly Rent</div>
                <div className="fw-semibold">{formatCurrency(listing.rent)}</div>
              </div>
              <div>
                <div className="text-muted small">Security Deposit</div>
                <div className="fw-semibold">{formatCurrency(listing.deposit)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form className="card p-4 p-md-5" onSubmit={handleSubmit}>
        <div className="fw-semibold mb-4">Application Details</div>

        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label d-flex align-items-center gap-2">
              <Calendar size={14} /> Preferred Move-in Date *
            </label>
            <input type="date" className="form-control" min={new Date().toISOString().split("T")[0]} required />
          </div>
          <div className="col-md-6">
            <label className="form-label d-flex align-items-center gap-2">
              <Calendar size={14} /> Lease Duration (months) *
            </label>
            <select className="form-select" required defaultValue="12">
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label d-flex align-items-center gap-2">
              <Briefcase size={14} /> Current Occupation *
            </label>
            <input className="form-control" placeholder="e.g., Software Engineer" required />
          </div>
          <div className="col-md-6">
            <label className="form-label d-flex align-items-center gap-2">
              <DollarSign size={14} /> Monthly Income (PKR) *
            </label>
            <input className="form-control" type="number" placeholder="75000" required />
          </div>

          <div className="col-12">
            <label className="form-label d-flex align-items-center gap-2">
              <Home size={14} /> Current Address *
            </label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Enter your current residential address"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label d-flex align-items-center gap-2">
              <User size={14} /> Emergency Contact Name *
            </label>
            <input className="form-control" placeholder="Full name" required />
          </div>
          <div className="col-md-6">
            <label className="form-label d-flex align-items-center gap-2">
              <Phone size={14} /> Emergency Contact Phone *
            </label>
            <input className="form-control" placeholder="+92 300 0000000" required />
          </div>

          <div className="col-12">
            <label className="form-label d-flex align-items-center gap-2">
              <FileText size={14} /> Supporting Documents
            </label>
            <label className="upload-card">
              <Upload size={22} />
              <div className="fw-semibold mt-2">Upload ID Proof, Salary Slips, Bank Statement</div>
              <div className="text-muted small">PDF, JPG, PNG (Max 5MB each)</div>
              <input type="file" className="d-none" multiple accept=".pdf,.jpg,.jpeg,.png" />
            </label>
          </div>

          <div className="col-12">
            <label className="form-label">Additional Notes (Optional)</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Any additional information you'd like to share with the landlord"
            />
          </div>
        </div>

        <div className="intent-summary mt-4">
          <div className="fw-semibold mb-3">Initial Payment Summary</div>
          <div className="d-flex justify-content-between text-muted small">
            <span>Security Deposit</span>
            <span>{formatCurrency(listing.deposit)}</span>
          </div>
          <div className="d-flex justify-content-between text-muted small">
            <span>First Month Rent</span>
            <span>{formatCurrency(listing.rent)}</span>
          </div>
          <div className="d-flex justify-content-between text-muted small">
            <span>Agreement Charges</span>
            <span>{formatCurrency(2500)}</span>
          </div>
          <div className="d-flex justify-content-between fw-semibold mt-2">
            <span>Total Initial Amount</span>
            <span className="text-danger">{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="form-check mt-3">
          <input className="form-check-input" type="checkbox" id="intent-terms" required />
          <label className="form-check-label" htmlFor="intent-terms">
            I confirm that all information provided is accurate and I agree to the
            <button type="button" className="btn btn-link p-0 ms-1 intent-link">terms and conditions</button>.
          </label>
        </div>

        <div className="d-flex gap-3 mt-4">
          <button type="button" className="btn btn-light border w-25" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary-soft w-25">
            <Check size={16} className="me-2" />
            Submit Rental Intent
          </button>
        </div>
      </form>
    </div>
  );
}
