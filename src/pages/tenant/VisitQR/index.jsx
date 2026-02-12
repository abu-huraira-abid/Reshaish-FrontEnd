import React, { useEffect, useState } from "react";
import { Calendar, CheckCircle2, Clock, MapPin } from "lucide-react";
import QrDisplay from "./components/QrDisplay.jsx";
import { fetchVisitRequests, generateQrToken } from "../../../services/mock/visits.js";

export default function VisitQR() {
  const [token, setToken] = useState("");
  const [visit, setVisit] = useState(null);

  useEffect(() => {
    fetchVisitRequests().then((data) => {
      const scheduled = data.find((item) => item.status === "Scheduled") || data[0];
      setVisit(scheduled);
    });
    generateQrToken("v-201").then((data) => setToken(data.token));
  }, []);

  if (!visit) {
    return (
      <div>
        <div className="section-title">Visit QR</div>
        <div className="section-subtitle">Loading visit details...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Visit Check-in</div>
        <div className="section-subtitle">Show this QR code to the agent when you arrive.</div>
      </div>

      <div className="card p-4 mb-4">
        <div className="fw-semibold mb-3">Visit Details</div>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="text-muted small">Property</div>
            <div className="fw-semibold">{visit.property}</div>
          </div>
          <div className="col-md-6">
            <div className="text-muted small d-flex align-items-center gap-2">
              <MapPin size={14} /> Location
            </div>
            <div className="fw-semibold">{visit.location}</div>
          </div>
          <div className="col-md-6">
            <div className="text-muted small d-flex align-items-center gap-2">
              <Calendar size={14} /> Date
            </div>
            <div className="fw-semibold">
              {new Date(visit.date).toLocaleDateString("en-PK", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-muted small d-flex align-items-center gap-2">
              <Clock size={14} /> Time
            </div>
            <div className="fw-semibold">{visit.time}</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <QrDisplay token={token || "Generating..."} />
        </div>
        <div className="col-lg-7">
          <div className="card p-4">
            <div className="fw-semibold mb-3">Visit Timeline</div>
            <div className="d-grid gap-3">
              <div className="d-flex gap-3">
                <div className="icon-circle" style={{ background: "#dcfce7" }}>
                  <CheckCircle2 size={18} className="text-success" />
                </div>
                <div>
                  <div className="fw-semibold">Visit Scheduled</div>
                  <div className="text-muted small">Your visit has been confirmed</div>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div className="icon-circle" style={{ background: "#f3f4f6" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: "#9ca3af" }} />
                </div>
                <div>
                  <div className="fw-semibold">Check-in</div>
                  <div className="text-muted small">Pending - Show QR to agent</div>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div className="icon-circle" style={{ background: "#f3f4f6" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: "#9ca3af" }} />
                </div>
                <div>
                  <div className="fw-semibold">Property Tour</div>
                  <div className="text-muted small">View the property with agent</div>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div className="icon-circle" style={{ background: "#f3f4f6" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: "#9ca3af" }} />
                </div>
                <div>
                  <div className="fw-semibold">Check-out</div>
                  <div className="text-muted small">Complete your visit</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-primary-soft">Get Directions</button>
          </div>
        </div>
      </div>
    </div>
  );
}
