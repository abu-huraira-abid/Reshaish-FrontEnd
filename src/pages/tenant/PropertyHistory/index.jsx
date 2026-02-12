import React from "react";
import { Award, Calendar, CheckCircle2, Download, Home, MapPin, Star, TrendingUp } from "lucide-react";
import Modal from "../../../components/common/Modal.jsx";

const tenantProfile = {
  name: "Hassan Ali",
  trustScore: 92,
  totalRentals: 3,
  yearsAsRenter: 4,
  onTimePayments: 45,
  totalPayments: 48,
  verified: true
};

const history = [
  {
    id: "p-1",
    title: "Luxury 2 Bed Apartment",
    location: "Gulberg III, Lahore",
    address: "House 45, Gulberg III, Lahore",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    landlord: { name: "Faisal Khan", contact: "+92 300 1234567" },
    period: { from: "2025-01-15", to: "Current", duration: "1 month (ongoing)" },
    rent: 35000,
    deposit: 70000,
    status: "active",
    paymentHistory: { onTime: 1, total: 1, percentage: 100 },
    rating: { byLandlord: 5, byTenant: 5 },
    agreementNumber: "AGR-2024-001234"
  },
  {
    id: "p-2",
    title: "Modern Studio Apartment",
    location: "DHA Phase 5, Lahore",
    address: "Street 12, DHA Phase 5, Lahore",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
    landlord: { name: "Ayesha Malik", contact: "+92 300 9876543" },
    period: { from: "2023-06-01", to: "2024-12-31", duration: "1 year 7 months" },
    rent: 28000,
    deposit: 56000,
    status: "completed",
    paymentHistory: { onTime: 18, total: 19, percentage: 95 },
    rating: { byLandlord: 5, byTenant: 4 },
    agreementNumber: "AGR-2023-000892",
    exitNotes: "Left in excellent condition. Full deposit refunded."
  }
];

export default function PropertyHistory() {
  const [selected, setSelected] = React.useState(null);

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Property History</div>
        <div className="section-subtitle">Your complete rental history and tenant profile.</div>
      </div>

      <div className="card p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="icon-circle" style={{ background: "#3b82f6" }}>
              <Home size={18} className="text-white" />
            </div>
            <div>
              <div className="fw-semibold d-flex align-items-center gap-2">
                {tenantProfile.name}
                {tenantProfile.verified && <CheckCircle2 size={16} className="text-success" />}
              </div>
              <div className="text-muted small">Verified Tenant Profile</div>
            </div>
          </div>
          <div className="text-center">
            <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center" style={{ width: "72px", height: "72px" }}>
              <div>
                <div className="fw-semibold">{tenantProfile.trustScore}</div>
                <div className="small">Trust</div>
              </div>
            </div>
            <div className="text-muted small mt-1">Excellent</div>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-3">
            <div className="stat-tile">
              <Home size={18} className="text-primary" />
              <div>
                <div className="fw-semibold">{tenantProfile.totalRentals}</div>
                <div className="text-muted small">Properties Rented</div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-tile">
              <Calendar size={18} className="text-warning" />
              <div>
                <div className="fw-semibold">{tenantProfile.yearsAsRenter}</div>
                <div className="text-muted small">Years as Renter</div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-tile">
              <CheckCircle2 size={18} className="text-success" />
              <div>
                <div className="fw-semibold">{Math.round((tenantProfile.onTimePayments / tenantProfile.totalPayments) * 100)}%</div>
                <div className="text-muted small">On-time Payments</div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-tile">
              <Star size={18} className="text-warning" />
              <div>
                <div className="fw-semibold">4.7</div>
                <div className="text-muted small">Avg. Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-grid gap-3">
        {history.map((property) => (
          <div className="card" key={property.id}>
            <div className="p-3 bg-light border-bottom">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="rounded-4"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <div>
                    <div className="fw-semibold">{property.title}</div>
                    <div className="text-muted small d-flex align-items-center gap-2">
                      <MapPin size={14} /> {property.location}
                    </div>
                    <div className="text-muted small">Agreement: {property.agreementNumber}</div>
                  </div>
                </div>
                <div className="text-end">
                  <span className={`badge-pill ${property.status === "active" ? "badge-verified" : "badge-info"}`}>
                    {property.status.toUpperCase()}
                  </span>
                  {property.status === "active" && (
                    <div className="text-success small mt-1 d-flex align-items-center gap-1">
                      <Award size={14} /> Current Property
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3">
              <div className="row g-3 mb-3">
                <div className="col-md-3">
                  <div className="text-muted small">Rental Period</div>
                  <div className="fw-semibold">{property.period.from} - {property.period.to}</div>
                  <div className="text-muted small">{property.period.duration}</div>
                </div>
                <div className="col-md-3">
                  <div className="text-muted small">Monthly Rent</div>
                  <div className="fw-semibold">PKR {property.rent.toLocaleString()}</div>
                  <div className="text-muted small">Deposit: PKR {property.deposit.toLocaleString()}</div>
                </div>
                <div className="col-md-3">
                  <div className="text-muted small">Payment Record</div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="flex-grow-1 bg-light rounded-pill" style={{ height: "6px" }}>
                      <div className="bg-success rounded-pill" style={{ width: `${property.paymentHistory.percentage}%`, height: "100%" }} />
                    </div>
                    <div className="small fw-semibold">{property.paymentHistory.percentage}%</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-muted small">Ratings</div>
                  <div className="d-flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={14} className={idx < property.rating.byLandlord ? "text-warning" : "text-muted"} />
                    ))}
                  </div>
                  <div className="text-muted small">By Landlord</div>
                </div>
              </div>

              <div className="card-soft p-3 mb-3">
                <div className="text-muted small">Landlord</div>
                <div className="fw-semibold">{property.landlord.name}</div>
                <div className="text-muted small">{property.landlord.contact}</div>
              </div>

              {property.exitNotes && (
                <div className="card-soft p-3 mb-3">
                  <div className="fw-semibold">Exit Notes</div>
                  <div className="text-muted small">{property.exitNotes}</div>
                </div>
              )}

              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-light border" onClick={() => setSelected(property)}>
                  View Full Details
                </button>
                <button className="btn btn-light border">
                  <Download size={16} className="me-2" />
                  Download Records
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-4 mt-4">
        <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
          <TrendingUp size={16} className="text-danger" />
          How Your Trust Score is Calculated
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card-soft p-3">
              <div className="fw-semibold">Payment History (50%)</div>
              <div className="text-muted small">On-time rent and bill payments</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-soft p-3">
              <div className="fw-semibold">Property Care (30%)</div>
              <div className="text-muted small">Condition at exit, maintenance issues</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-soft p-3">
              <div className="fw-semibold">Landlord Ratings (20%)</div>
              <div className="text-muted small">Average ratings from landlords</div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={Boolean(selected)}
        title="Property Details"
        onClose={() => setSelected(null)}
        actions={<button className="btn btn-primary-soft" onClick={() => setSelected(null)}>Close</button>}
      >
        {selected && (
          <div>
            <div className="fw-semibold mb-1">{selected.title}</div>
            <div className="text-muted small">{selected.address}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}
