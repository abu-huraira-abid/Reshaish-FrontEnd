import React from "react";
import { Download, Search } from "lucide-react";

export default function PaymentFilters({ query, onQueryChange, active, onFilterChange }) {
  const filters = ["All", "Rent", "Bills"];
  return (
    <div className="card payment-filters">
      <div className="payment-search input-group">
        <span className="input-group-text auth-input-icon">
          <Search size={16} />
        </span>
        <input
          className="form-control"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by transaction ID or description..."
        />
      </div>
      <div className="payment-pill-group">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`payment-pill ${active === filter ? "active" : ""}`}
            onClick={() => onFilterChange(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
      <button className="btn btn-light border payment-export" type="button">
        <Download size={16} className="me-2" />
        Export
      </button>
    </div>
  );
}
