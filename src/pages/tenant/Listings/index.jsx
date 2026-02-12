import React, { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import FilterBar from "./components/FilterBar.jsx";
import ListingCard from "./components/ListingCard.jsx";
import Loading from "../../../components/common/Loading.jsx";
import { fetchListings } from "../../../services/mock/listings.js";

const PAGE_SIZE = 6;

export default function Listings() {
  const [filters, setFilters] = useState({
    location: "Lahore",
    budget: "",
    type: "",
    sort: "recommended",
    beds: "",
    minRent: "",
    maxRent: "",
    minSize: "",
    maxSize: "",
    portion: "",
    residentialType: "",
    verified: true
  });
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const load = async (nextFilters = filters) => {
    setLoading(true);
    const maxFromBudget = nextFilters.budget ? Number(nextFilters.budget) : null;
    const maxRent = nextFilters.maxRent ? Number(nextFilters.maxRent) : maxFromBudget;
    const data = await fetchListings({
      city: nextFilters.location,
      type: nextFilters.type,
      minRent: nextFilters.minRent || null,
      maxRent,
      beds: nextFilters.beds || null,
      minSize: nextFilters.minSize || null,
      maxSize: nextFilters.maxSize || null,
      portion: nextFilters.portion || null,
      residentialType: nextFilters.residentialType || null,
      verified: nextFilters.verified
    });
    setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [
    filters.location,
    filters.type,
    filters.budget,
    filters.minRent,
    filters.maxRent,
    filters.beds,
    filters.minSize,
    filters.maxSize,
    filters.portion,
    filters.residentialType,
    filters.verified
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    filters.location,
    filters.type,
    filters.budget,
    filters.minRent,
    filters.maxRent,
    filters.beds,
    filters.minSize,
    filters.maxSize,
    filters.portion,
    filters.residentialType,
    filters.sort,
    filters.verified
  ]);

  const handleChange = (event) => {
    setFilters((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleCheckbox = (event) => {
    setFilters((prev) => ({ ...prev, [event.target.name]: event.target.checked }));
  };

  const sortedListings = useMemo(() => {
    const sorted = [...listings];
    if (filters.sort === "low") {
      sorted.sort((a, b) => a.rent - b.rent);
    }
    if (filters.sort === "high") {
      sorted.sort((a, b) => b.rent - a.rent);
    }
    return sorted;
  }, [listings, filters.sort]);

  const totalPages = Math.max(1, Math.ceil(sortedListings.length / PAGE_SIZE));
  const pagedListings = sortedListings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Find Your Perfect Home</div>
        <div className="section-subtitle">Browse verified properties with agent assistance.</div>
      </div>
      <FilterBar filters={filters} onChange={handleChange} onSearch={() => load(filters)} />

      <div className="listing-toolbar mt-4">
        <div>
          <h4 className="mb-1">Properties in {filters.location}</h4>
          <div className="text-muted small">Showing {sortedListings.length} results</div>
        </div>
        <div className="listing-actions">
          <button
            className="btn btn-light border filter-btn"
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <SlidersHorizontal size={16} className="me-2" />
            Filters
          </button>
          <select
            className="form-select sort-select"
            name="sort"
            value={filters.sort}
            onChange={handleChange}
          >
            <option value="recommended">Sort by: Recommended</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="card filter-panel mt-3">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Bedrooms</label>
              <select className="form-select" name="beds" value={filters.beds} onChange={handleChange}>
                <option value="">Any</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
                <option value="5">5 Beds</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Min Rent (PKR)</label>
              <input
                className="form-control"
                name="minRent"
                value={filters.minRent}
                onChange={handleChange}
                placeholder="30000"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Max Rent (PKR)</label>
              <input
                className="form-control"
                name="maxRent"
                value={filters.maxRent}
                onChange={handleChange}
                placeholder="120000"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Portion</label>
              <select className="form-select" name="portion" value={filters.portion} onChange={handleChange}>
                <option value="">Any</option>
                <option value="Upper">Upper</option>
                <option value="Lower">Lower</option>
                <option value="Full">Full</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Property Use</label>
              <select
                className="form-select"
                name="residentialType"
                value={filters.residentialType}
                onChange={handleChange}
              >
                <option value="">Any</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial (Non-Residential)</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Min Sq Ft</label>
              <input
                className="form-control"
                name="minSize"
                value={filters.minSize}
                onChange={handleChange}
                placeholder="600"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Max Sq Ft</label>
              <input
                className="form-control"
                name="maxSize"
                value={filters.maxSize}
                onChange={handleChange}
                placeholder="2000"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Verified</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  name="verified"
                  checked={filters.verified}
                  onChange={handleCheckbox}
                />
                <span className="toggle-slider" />
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Furnishing</label>
              <select className="form-select" disabled>
                <option>Any</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Parking</label>
              <select className="form-select" disabled>
                <option>Any</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              className="btn btn-light border"
              type="button"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  beds: "",
                  minRent: "",
                  maxRent: "",
                  minSize: "",
                  maxSize: "",
                  portion: "",
                  residentialType: "",
                  verified: true
                }))
              }
            >
              Clear
            </button>
            <button className="btn btn-primary-soft" type="button" onClick={() => setShowFilters(false)}>
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        {loading ? (
          <Loading label="Loading listings" />
        ) : (
          <div className="row g-4">
            {pagedListings.map((listing) => (
              <div className="col-md-6 col-xl-4" key={listing.id}>
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              return (
                <li className={`page-item ${pageNum === page ? "active" : ""}`} key={pageNum}>
                  <button className="page-link" onClick={() => setPage(pageNum)}>
                    {pageNum}
                  </button>
                </li>
              );
            })}
            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
