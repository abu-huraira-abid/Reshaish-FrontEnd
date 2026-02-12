import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Award,
  CheckCircle2,
  Clock,
  CreditCard,
  Phone,
  Shield,
  Star
} from "lucide-react";
import Modal from "../../../components/common/Modal.jsx";
import { fetchServiceById } from "../../../services/mock/marketplace.js";
import { formatCurrency } from "../../../utils/helpers.js";

export default function ServiceBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState("standard");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const lookupId = id?.startsWith("s-") ? id : `s-${id}`;
    fetchServiceById(lookupId).then(setService);
  }, [id]);

  const packages = useMemo(
    () => [
      {
        id: "basic",
        name: "Basic Moving",
        subtitle: "1BHK - up to 50 items",
        price: 3500,
        features: ["Loading & Unloading", "Transportation", "Basic Insurance"]
      },
      {
        id: "standard",
        name: "Standard Moving",
        subtitle: "2BHK - up to 100 items",
        price: 5500,
        features: [
          "Complete Packing",
          "Loading & Unloading",
          "Transportation",
          "Insurance Included",
          "Unpacking Service"
        ],
        popular: true
      },
      {
        id: "premium",
        name: "Premium Moving",
        subtitle: "3BHK+ - unlimited items",
        price: 8500,
        features: [
          "Premium Packing Materials",
          "Complete Packing",
          "Loading & Unloading",
          "Transportation",
          "Full Insurance",
          "Unpacking & Setup",
          "Furniture Assembly"
        ]
      }
    ],
    []
  );

  const selectedPackageData = packages.find((pkg) => pkg.id === selectedPackage) || packages[0];
  const platformFee = 99;
  const gstAmount = Math.round((selectedPackageData.price + platformFee) * 0.18);
  const totalAmount = selectedPackageData.price + platformFee + gstAmount;
  const canProceed = Boolean(selectedDate && selectedTime);

  if (!service) {
    return (
      <div>
        <div className="section-title">Service Booking</div>
        <div className="section-subtitle">Loading service details...</div>
      </div>
    );
  }

  const serviceDescription = `${service.description} Our experienced team ensures safe handling of all your belongings.`;

  const availableDates = [
    "2025-01-04",
    "2025-01-05",
    "2025-01-06",
    "2025-01-07",
    "2025-01-08"
  ];
  const availableSlots = [
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM"
  ];

  const includes = [
    "Professional Packing Materials",
    "GPS-Tracked Vehicles",
    "Loading & Unloading",
    "Trained & Insured Team",
    "Same Day Service Available",
    "Furniture Assembly/Disassembly"
  ];

  return (
    <div>
      <button className="btn btn-link px-0 text-muted mb-3 text-decoration-none" onClick={() => navigate(-1)}>
        &larr; Back to Services
      </button>

      <div className="row g-4">
        <div className="col-lg-8 d-grid gap-4">
          <div className="card overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-100"
              style={{ height: "240px", objectFit: "cover" }}
            />
            <div className="p-4">
              <h4 className="mb-1">{service.title}</h4>
              <div className="text-muted small">{service.vendor}</div>
              <div className="d-flex flex-wrap align-items-center gap-3 text-muted small mt-2">
                <span className="d-inline-flex align-items-center gap-1">
                  <Star size={14} className="text-warning" />
                  {service.rating} ({service.reviews} reviews)
                </span>
                <span className="d-inline-flex align-items-center gap-1 text-success">
                  <Shield size={14} /> Verified Partner
                </span>
                <span className="d-inline-flex align-items-center gap-1">
                  <Clock size={14} /> Responds in {service.responseTime}
                </span>
              </div>
              <p className="text-muted small mt-3 mb-3">{serviceDescription}</p>
              <div className="fw-semibold mb-2">What&apos;s Included</div>
              <div className="row">
                {includes.map((item) => (
                  <div className="col-md-6" key={item}>
                    <div className="service-includes">
                      <span className="d-inline-flex align-items-center gap-2">
                        <CheckCircle2 size={16} className="text-success" />
                        <span>{item}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="fw-semibold mb-3">Select Package</div>
            <div className="row g-3">
              {packages.map((pkg) => (
                <div className="col-md-4" key={pkg.id}>
                  <button
                    type="button"
                    className={`package-card text-start w-100 h-100 d-flex flex-column ${selectedPackage === pkg.id ? "active" : ""}`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {pkg.popular && <span className="package-badge">Popular</span>}
                    <div className="fw-semibold">{pkg.name}</div>
                    <div className="text-muted small mb-2">{pkg.subtitle}</div>
                    <div className="text-danger fw-semibold mb-2">{formatCurrency(pkg.price)}</div>
                    <div className="d-grid gap-2">
                      {pkg.features.map((feature) => (
                        <span key={feature} className="d-inline-flex align-items-center gap-2 text-muted small">
                          <CheckCircle2 size={14} className="text-success" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <div className="fw-semibold mb-3">Schedule Service</div>
            <div className="mb-3">
              <div className="text-muted small mb-2">Select Date</div>
              <div className="d-flex flex-wrap gap-2">
                {availableDates.map((date) => {
                  const parsed = new Date(date);
                  return (
                    <button
                      key={date}
                      className={`date-pill ${selectedDate === date ? "active" : ""}`}
                      onClick={() => setSelectedDate(date)}
                      type="button"
                    >
                      <div className="text-muted small">{parsed.toLocaleDateString("en-PK", { weekday: "short" })}</div>
                      <div className="fw-semibold">{parsed.getDate()}</div>
                      <div className="text-muted small">{parsed.toLocaleDateString("en-PK", { month: "short" })}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-muted small mb-2">Select Time Slot</div>
              <div className="d-flex flex-wrap gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    className={`time-pill ${selectedTime === slot ? "active" : ""}`}
                    onClick={() => setSelectedTime(slot)}
                    type="button"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="fw-semibold mb-3">Service Address</div>
            <div className="text-muted small mb-2">Property Address</div>
            <div className="bg-light rounded-4 p-3 mb-3">
              <div className="fw-semibold">Luxury 2 BHK in Gulberg</div>
              <div className="text-muted small">Plot 45, Gulberg III, Lahore</div>
            </div>
            <label className="form-label">Contact Number</label>
            <input className="form-control mb-3" defaultValue="+92 300 1234567" />
            <label className="form-label">Additional Instructions (Optional)</label>
            <textarea className="form-control" rows={3} placeholder="Any specific requirements or instructions for the service provider..." />
          </div>

          <div className="card p-4">
            <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
              <Award size={16} className="text-danger" />
              About Service Provider
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="text-muted small">Company Name</div>
                <div className="fw-semibold">{service.vendor}</div>
              </div>
              <div className="col-md-6">
                <div className="text-muted small">Years in Business</div>
                <div className="fw-semibold">8 years</div>
              </div>
              <div className="col-md-6">
                <div className="text-muted small">Completed Orders</div>
                <div className="fw-semibold">15,000+</div>
              </div>
              <div className="col-md-6">
                <div className="text-muted small">Contact</div>
                <div className="text-muted small d-flex align-items-center gap-2">
                  <Phone size={14} /> +92 300 0000000
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className="badge-pill badge-verified">ISO Certified</span>
              <span className="badge-pill badge-verified">Registered Transport</span>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card p-4 sticky-top" style={{ top: "96px" }}>
            <div className="fw-semibold mb-3">Booking Summary</div>
            <div className="d-grid gap-2 mb-3">
              <div>
                <div className="text-muted small">Selected Package</div>
                <div className="fw-semibold">{selectedPackageData.name}</div>
              </div>
            </div>
            <div className="border-top pt-3 mb-3">
              <div className="d-flex justify-content-between small text-muted">
                <span>Service Charge</span>
                <span>{formatCurrency(selectedPackageData.price)}</span>
              </div>
              <div className="d-flex justify-content-between small text-muted">
                <span>Platform Fee</span>
                <span>{formatCurrency(platformFee)}</span>
              </div>
              <div className="d-flex justify-content-between small text-muted">
                <span>GST (18%)</span>
                <span>{formatCurrency(gstAmount)}</span>
              </div>
              <div className="d-flex justify-content-between fw-semibold mt-2">
                <span>Total Amount</span>
                <span className="text-danger">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
            <button
              className={`w-100 btn ${canProceed ? "btn-primary-soft" : "btn-light"}`}
              disabled={!canProceed}
              onClick={() => setConfirmOpen(true)}
            >
              <CreditCard size={16} className="me-2" />
              Proceed to Payment
            </button>
            <div className="mt-3 text-muted small">
              <div className="d-flex align-items-center gap-2 mb-1">
                <CheckCircle2 size={14} className="text-success" />
                100% Secure Payment
              </div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <CheckCircle2 size={14} className="text-success" />
                Verified Service Provider
              </div>
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={14} className="text-success" />
                24/7 Customer Support
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={confirmOpen}
        title="Confirm Booking"
        onClose={() => setConfirmOpen(false)}
        actions={
          <>
            <button className="btn btn-light" onClick={() => setConfirmOpen(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary-soft"
              onClick={() => {
                setConfirmOpen(false);
                navigate("/tenant/service-orders");
              }}
            >
              Confirm & Pay
            </button>
          </>
        }
      >
        <div className="text-muted small">
          You are booking {service.title} on {selectedDate || ""} at {selectedTime || ""}.
        </div>
      </Modal>
    </div>
  );
}
