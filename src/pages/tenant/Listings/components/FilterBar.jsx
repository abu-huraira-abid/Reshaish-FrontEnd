import React from "react";
import { Search } from "lucide-react";

export default function FilterBar({ filters, onChange, onSearch }) {
  return (
    <div className="search-panel listing-search">
      <div className="row g-3 align-items-end">
        <div className="col-md-3">
          <label className="form-label">Location</label>
          <input
            className="form-control"
            name="location"
            value={filters.location}
            onChange={onChange}
            placeholder="Lahore"
            list="tenant-locations"
          />
          <datalist id="tenant-locations">
            <option value="Lahore" />
            <option value="Islamabad" />
            <option value="Karachi" />
          </datalist>
        </div>
        <div className="col-md-3">
          <label className="form-label">Budget</label>
          <select className="form-select" name="budget" value={filters.budget} onChange={onChange}>
            <option value="">Any budget</option>
            <option value="50000">Up to PKR 50,000</option>
            <option value="80000">Up to PKR 80,000</option>
            <option value="120000">Up to PKR 120,000</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Property Type</label>
          <select className="form-select" name="type" value={filters.type} onChange={onChange}>
            <option value="">All types</option>
            <option value="Studio">Studio</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary-soft w-100" onClick={onSearch} type="button">
            <Search size={16} className="me-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
