import React from "react";
import { Briefcase, MapPin, Wallet } from "lucide-react";

export default function FlatmateCard({ person, onSelect, onConnect }) {
  const budgetLabel = Number(person.budget || 0)
    ? `PKR ${Number(person.budget).toLocaleString()}`
    : "Flexible";

  return (
    <div className="card flatmate-card h-100 cursor-pointer" onClick={onSelect} role="button">
      <img src={person.image} alt={person.name} />
      <div className="card-body">
        <h6 className="fw-semibold">{person.name}</h6>
        {person.isListing && <div className="badge-pill badge-info mb-2">Property available</div>}
        <div className="flatmate-meta">
          <span><Briefcase size={14} /> {person.role}</span>
          <span><MapPin size={14} /> {person.location || person.city || "Location flexible"}</span>
          <span><Wallet size={14} /> {person.isListing ? "Share" : "Budget"}: {budgetLabel}</span>
        </div>
        {person.property && (
          <div className="text-muted small mt-2">{person.property}</div>
        )}
        <button
          className="btn btn-primary-soft w-100 mt-3"
          onClick={(event) => {
            event.stopPropagation();
            onConnect?.();
          }}
        >
          Connect
        </button>
      </div>
    </div>
  );
}
