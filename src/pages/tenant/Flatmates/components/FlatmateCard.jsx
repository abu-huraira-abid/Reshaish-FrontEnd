import React from "react";
import { Briefcase, MapPin, Wallet } from "lucide-react";

export default function FlatmateCard({ person, onSelect, onConnect }) {
  return (
    <div className="card flatmate-card h-100 cursor-pointer" onClick={onSelect} role="button">
      <img src={person.image} alt={person.name} />
      <div className="card-body">
        <h6 className="fw-semibold">{person.name}, {person.age}</h6>
        <div className="flatmate-meta">
          <span><Briefcase size={14} /> {person.role}</span>
          <span><MapPin size={14} /> {person.location}</span>
          <span><Wallet size={14} /> Budget: {person.budget}</span>
        </div>
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
