import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, MapPin } from "lucide-react";
import { fetchListingById } from "../../../services/mock/listings.js";
import Loading from "../../../components/common/Loading.jsx";

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM"
];

export default function RequestVisit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    fetchListingById(id).then(setListing);
  }, [id]);

  if (!listing) return <Loading label="Loading property" />;

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/tenant/visits");
  };

  return (
    <div className="w-75 mx-auto">
      <div className="card p-4 p-md-5">
        <div className="mb-4">
          <div className="section-title">Schedule a Visit</div>
          <div className="section-subtitle">Choose your preferred date and time to visit the property</div>
        </div>

        <form className="d-grid gap-4" onSubmit={handleSubmit}>
          <div className="visit-info">
            <div className="fw-semibold mb-1">{listing.title}</div>
            <div className="text-muted small d-flex align-items-center gap-2">
              <MapPin size={14} />
              {listing.address}, {listing.city}
            </div>
          </div>

          <div>
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div>
            <label className="form-label">Select Time Slot</label>
            <div className="row g-2">
              {timeSlots.map((slot) => (
                <div className="col-6 col-md-3" key={slot}>
                  <button
                    type="button"
                    className={`visit-slot w-100 ${selectedTime === slot ? "active" : ""}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label">Contact Number</label>
            <input className="form-control" placeholder="Enter your mobile number" required />
          </div>

          <div>
            <label className="form-label">Special Instructions (Optional)</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Any specific requirements or questions?"
            />
          </div>

          <button className="btn btn-primary-soft w-50 mx-auto" type="submit" disabled={!selectedDate || !selectedTime}>
            <Check size={16} className="me-2" />
            Confirm Visit Request
          </button>
        </form>
      </div>
    </div>
  );
}
