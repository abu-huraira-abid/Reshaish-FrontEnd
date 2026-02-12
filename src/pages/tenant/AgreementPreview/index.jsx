import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Check, DollarSign, Download, FileText, Home, ListChecks } from "lucide-react";
import Loading from "../../../components/common/Loading.jsx";
import { fetchListingById } from "../../../services/mock/listings.js";
import { formatCurrency } from "../../../utils/helpers.js";

export default function AgreementPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listingId = id || "l-100";
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchListingById(listingId).then((data) => {
      setListing(data || null);
      setLoading(false);
    });
  }, [listingId]);

  if (loading) {
    return <Loading label="Loading agreement" />;
  }

  if (!listing) {
    return (
      <div className="card p-4">
        <div className="fw-semibold mb-1">Agreement not available</div>
        <div className="text-muted small">We could not find details for this agreement.</div>
      </div>
    );
  }

  const agreementNumber = "AGR-2024-001234";
  const agreementDate = "12/22/2024";
  const agreementCharges = 2500;
  const maintenanceCharges = 2000;
  const totalInitial = listing.deposit + listing.rent + agreementCharges;

  return (
    <div className="w-75 mx-auto">
      <button
        className="btn btn-link px-0 text-muted text-decoration-none mb-3"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div>
          <div className="section-title">Rental Agreement</div>
          <div className="text-muted small">Agreement No: {agreementNumber}</div>
        </div>
        <button className="btn btn-light border">
          <Download size={16} className="me-2" />
          Download PDF
        </button>
      </div>

      <div className="agreement-banner mb-3">
        <div className="d-flex align-items-center gap-2">
          <span className="agreement-banner-icon">
            <FileText size={16} />
          </span>
          <div>
            <div className="fw-semibold">Review and sign this agreement to proceed with payment</div>
            <div className="text-muted small">Generated on {agreementDate}</div>
          </div>
        </div>
      </div>

      <div className="card agreement-card">
        <div className="agreement-body">
          <div className="text-center fw-semibold mb-1">RENTAL AGREEMENT</div>
          <div className="text-center text-muted small mb-4">
            Agreement No: {agreementNumber} &nbsp; | &nbsp; Date: {agreementDate}
          </div>

          <div className="text-muted small mb-3">THIS AGREEMENT is made between:</div>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="agreement-party">
                <div className="text-muted small">LANDLORD (Lessor)</div>
                <div className="fw-semibold">Faisal Khan</div>
                <div className="text-muted small">+92 300 1234567</div>
                <div className="text-muted small">faisal.khan@email.com</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="agreement-party">
                <div className="text-muted small">TENANT (Lessee)</div>
                <div className="fw-semibold">Hassan Ali</div>
                <div className="text-muted small">+92 300 7654321</div>
                <div className="text-muted small">hassan.ali@email.com</div>
              </div>
            </div>
          </div>

          <div className="agreement-section">
            <div className="agreement-section-title">
              <Home size={14} />
              Property Details
            </div>
            <div className="agreement-panel">
              <div className="fw-semibold">{listing.title}</div>
              <div className="text-muted small">
                {listing.address}, {listing.city}
              </div>
              <div className="text-muted small mt-2">
                Type: {listing.tag || "2BHK"} &nbsp; | &nbsp; Area: {listing.size} sqft
              </div>
            </div>
          </div>

          <div className="agreement-section">
            <div className="agreement-section-title">
              <DollarSign size={14} />
              Financial Terms
            </div>
            <div className="agreement-rows">
              <div className="agreement-row">
                <span>Monthly Rent</span>
                <span>{formatCurrency(listing.rent)}</span>
              </div>
              <div className="agreement-row">
                <span>Security Deposit</span>
                <span>{formatCurrency(listing.deposit)}</span>
              </div>
              <div className="agreement-row">
                <span>Maintenance Charges</span>
                <span>{formatCurrency(maintenanceCharges)}/month</span>
              </div>
              <div className="agreement-row">
                <span>Agreement Charges</span>
                <span>{formatCurrency(agreementCharges)}</span>
              </div>
              <div className="agreement-row total">
                <span>Total Initial Payment</span>
                <span>{formatCurrency(totalInitial)}</span>
              </div>
            </div>
          </div>

          <div className="agreement-section">
            <div className="agreement-section-title">
              <Calendar size={14} />
              Lease Terms
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="agreement-kv">
                  <span>Lease Start Date</span>
                  <strong>1/14/2025</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="agreement-kv">
                  <span>Lease End Date</span>
                  <strong>1/13/2026</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="agreement-kv">
                  <span>Duration</span>
                  <strong>12 months</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="agreement-kv">
                  <span>Lock-in Period</span>
                  <strong>6 months</strong>
                </div>
              </div>
              <div className="col-12">
                <div className="agreement-kv">
                  <span>Rent Due Date</span>
                  <strong>5th of every month</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="agreement-section">
            <div className="agreement-section-title">
              <ListChecks size={14} />
              Terms and Conditions
            </div>
            <ol className="agreement-list">
              <li>The tenant shall use the premises exclusively for residential purposes.</li>
              <li>The tenant shall not sublet or assign the premises without written consent.</li>
              <li>Monthly rent to be paid by the 5th of each month.</li>
              <li>Security deposit refundable within 30 days of vacating, subject to inspection.</li>
              <li>Tenant responsible for minor repairs; landlord for major structural repairs.</li>
              <li>Either party may terminate with 2 months notice after lock-in period.</li>
              <li>Tenant shall maintain the property in good condition.</li>
              <li>No unauthorized alterations or modifications to the property.</li>
              <li>Tenant shall adhere to society rules and regulations.</li>
              <li>Disputes shall be subject to local jurisdiction.</li>
            </ol>
          </div>

          <div className="agreement-section">
            <div className="fw-semibold mb-2">Signatures</div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="agreement-sign">
                  <span className="text-muted small">LANDLORD</span>
                  <div className="fw-semibold">Faisal Khan</div>
                  <div className="text-muted small">Date: 12/25/2025</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="agreement-sign">
                  <span className="text-muted small">TENANT</span>
                  <div className="fw-semibold">Hassan Ali</div>
                  <div className="text-muted small">Date: 12/25/2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-check mt-3 agreement-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="agree-terms"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
        />
        <label className="form-check-label" htmlFor="agree-terms">
          I have read and understood all the terms and conditions mentioned in this rental agreement.
          I agree to abide by all the clauses and acknowledge that this is a legally binding document.
        </label>
      </div>

      <div className="d-flex gap-3 mt-3">
        <button className="btn btn-light border px-4" onClick={() => navigate(-1)}>
          Back
        </button>
        <button
          className="btn btn-primary-soft px-4"
          disabled={!agreed}
          onClick={() => setConfirmOpen(true)}
        >
          <Check size={16} className="me-2" />
          Sign Agreement
        </button>
      </div>

      {confirmOpen && (
        <div className="modal-backdrop-custom">
          <div className="confirm-modal">
            <div className="confirm-icon">
              <Check size={20} />
            </div>
            <div className="fw-semibold mb-2">Confirm Digital Signature</div>
            <div className="text-muted small text-center mb-3">
              By signing this agreement, you will proceed to make the initial payment.
            </div>
            <div className="confirm-card mb-3">
              <div className="text-muted small mb-1">Agreement for:</div>
              <div className="fw-semibold">{listing.title}</div>
              <div className="text-muted small">Agreement No: {agreementNumber}</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-light border flex-fill" onClick={() => setConfirmOpen(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary-soft flex-fill"
                onClick={() => navigate(`/tenant/initial-payment/${listingId}`)}
              >
                Confirm &amp; Sign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
