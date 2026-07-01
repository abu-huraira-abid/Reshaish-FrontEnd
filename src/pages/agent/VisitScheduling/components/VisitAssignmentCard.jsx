import React, { useState } from "react";
import { CalendarClock, Home, MapPin } from "lucide-react";

export default function VisitAssignmentCard({ assignment, loading, onSchedule }) {
  const [slot, setSlot] = useState("");

  return (
    <article className="card verification-schedule-card">
      <div className="verification-schedule-main">
        <div className="verification-schedule-icon">
          <Home size={22} />
        </div>
        <div className="min-w-0">
          <div className="verification-schedule-title">{assignment.property}</div>
          <div className="verification-schedule-meta">
            <span>
              <MapPin size={14} />
              {assignment.city || "Location not provided"}
            </span>
            <span>
              <CalendarClock size={14} />
              {assignment.slot || "Not scheduled yet"}
            </span>
          </div>
        </div>
      </div>

      <span className="badge-pill badge-info verification-schedule-status">
        {assignment.status}
      </span>

      <div className="visit-schedule-actions">
        <input
          className="form-control"
          min={new Date().toISOString().slice(0, 16)}
          onChange={(event) => setSlot(event.target.value)}
          type="datetime-local"
          value={slot}
        />
        <button
          className="btn btn-primary-soft btn-sm"
          disabled={!slot || loading}
          onClick={() => onSchedule(assignment, slot)}
          type="button"
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" />
              Scheduling...
            </>
          ) : (
            <>
              <CalendarClock size={16} />
              Schedule
            </>
          )}
        </button>
      </div>
    </article>
  );
}
