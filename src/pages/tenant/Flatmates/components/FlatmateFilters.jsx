import React from "react";
import { Search } from "lucide-react";

export default function FlatmateFilters() {
  return (
    <div className="search-panel">
      <div className="row g-3 align-items-end">
        <div className="col-md-3">
          <select className="form-select">
            <option>Location</option>
            <option>Lahore</option>
            <option>Islamabad</option>
            <option>Karachi</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select">
            <option>Budget Range</option>
            <option>PKR 15,000-20,000</option>
            <option>PKR 20,000-30,000</option>
            <option>PKR 30,000-40,000</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select">
            <option>Occupation</option>
            <option>Engineer</option>
            <option>Designer</option>
            <option>Analyst</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary-soft w-100" type="button">
            <Search size={16} className="me-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
