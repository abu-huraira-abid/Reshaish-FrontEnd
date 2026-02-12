import React, { useEffect, useState } from "react";
import { AlertCircle, Calendar, CheckCircle2, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/common/Loading.jsx";
import { fetchVisitRequests } from "../../../services/mock/visits.js";

const statusConfig = {
  Scheduled: { label: "Scheduled", icon: CheckCircle2, className: "badge-verified" },
  Requested: { label: "Pending", icon: AlertCircle, className: "badge-pending" },
  Completed: { label: "Completed", icon: CheckCircle2, className: "badge-info" },
  NoShow: { label: "No Show", icon: AlertCircle, className: "badge-danger" }
};

export default function Visits() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVisitRequests().then((data) => {
      setVisits(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">My Visit Schedule</div>
        <div className="section-subtitle">Track scheduled and completed visits.</div>
      </div>

      {loading ? (
        <Loading label="Loading visits" />
      ) : (
        <div className="d-grid gap-3">
          {visits.map((visit) => {
            const status = statusConfig[visit.status] || statusConfig.Requested;
            const StatusIcon = status.icon;
            return (
              <div className="card p-3" key={visit.id}>
                <div className="d-flex flex-wrap gap-3">
                  <img
                    src={visit.image}
                    alt={visit.property}
                    style={{ width: "140px", height: "120px", objectFit: "cover" }}
                    className="rounded-4"
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-start justify-content-between gap-2">
                      <div>
                        <h6 className="fw-semibold mb-1">{visit.property}</h6>
                        <div className="text-muted small d-flex align-items-center gap-2">
                          <MapPin size={14} />
                          {visit.location}
                        </div>
                      </div>
                      <span className={`badge-pill ${status.className} d-inline-flex align-items-center gap-1`}>
                        <StatusIcon size={14} />
                        {status.label}
                      </span>
                    </div>

                    <div className="d-flex flex-wrap gap-3 text-muted small mt-3">
                      <span className="d-flex align-items-center gap-1">
                        <Calendar size={14} />
                        {new Date(visit.date).toLocaleDateString("en-PK", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <Clock size={14} />
                        {visit.time}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex flex-column gap-2 ms-auto">
                    {visit.status === "Scheduled" && (
                      <>
                        <button className="btn btn-light border">Get Directions</button>
                        <button
                          className="btn btn-primary-soft"
                          onClick={() => navigate("/tenant/qr")}
                        >
                          QR Check-in
                        </button>
                      </>
                    )}
                    {visit.status === "Requested" && (
                      <button className="btn btn-light border">Cancel Request</button>
                    )}
                    {visit.status === "Completed" && (
                      <button
                        className="btn btn-primary-soft"
                        onClick={() => navigate(`/tenant/submit-intent/${visit.listingId}`)}
                      >
                        Submit Rental Intent
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
