import React from "react";
import { Filter, Search } from "lucide-react";

export default function ServiceSearchBar({ query, onQueryChange }) {
  return (
    <div className="card service-search-bar">
      <div className="d-flex gap-3 align-items-center">
        <div className="input-group flex-grow-1">
          <span className="input-group-text auth-input-icon">
            <Search size={16} />
          </span>
          <input
            className="form-control"
            placeholder="Search services..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </div>
        <button className="btn btn-light border d-flex align-items-center gap-2" type="button">
          <Filter size={16} />
          Filter
        </button>
      </div>
    </div>
  );
}
