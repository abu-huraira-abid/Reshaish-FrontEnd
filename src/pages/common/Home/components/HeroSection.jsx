import React from "react";
import { Search } from "lucide-react";

const points = [
  {
    title: "Verified Properties",
    text: "All properties verified by our professional team."
  },
  {
    title: "Easy Booking",
    text: "Schedule visits and book properties online."
  },
  {
    title: "Find Flatmates",
    text: "Connect with compatible roommates."
  }
];

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container container-wide">
        <div className="row align-items-center g-4 hero-grid">
          <div className="col-lg-6">
            <h1 className="hero-title">Find Your Perfect Home</h1>
            <p className="hero-subtitle">
              Join thousands of happy renters who found their dream home through Rehaish. Verified properties, trusted agents,
              and hassle-free experiences.
            </p>
            <div className="hero-list">
              {points.map((point) => (
                <div className="hero-list-item" key={point.title}>
                  <span className="hero-dot" />
                  <div>
                    <div className="hero-list-title">{point.title}</div>
                    <div className="hero-list-text">{point.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-search-card">
              <h5 className="hero-card-title">Find Your Perfect Place to Live</h5>
              <label className="form-label">Location</label>
              <input className="form-control mb-3" placeholder="Enter location" list="hero-cities" />
              <datalist id="hero-cities">
                <option value="Lahore" />
                <option value="Islamabad" />
                <option value="Karachi" />
              </datalist>
              <label className="form-label">Budget</label>
              <select className="form-select mb-3">
                <option value="">Any budget</option>
                <option value="40000">PKR 40,000 - 60,000</option>
                <option value="60000">PKR 60,000 - 90,000</option>
                <option value="90000">PKR 90,000 - 140,000</option>
                <option value="140000">PKR 140,000+</option>
              </select>
              <label className="form-label">Property Type</label>
              <select className="form-select mb-3">
                <option value="">All types</option>
                <option value="Studio">Studio</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
              </select>
              <button className="btn btn-primary-soft w-100" type="button">
                <Search size={18} className="me-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
