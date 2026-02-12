import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Home } from "lucide-react";
import Footer from "../components/common/Footer.jsx";

const navLinks = [
  { label: "Find Properties", to: "/" },
  { label: "Flatmates", to: "/" },
  { label: "How It Works", to: "/" },
  { label: "Login", to: "/auth/login" }
];

export default function AuthLayout() {
  return (
    <div className="page-shell">
      <nav className="navbar navbar-expand-lg landing-nav">
        <div className="container container-wide">
          <Link className="navbar-brand" to="/">
            <span className="brand-icon">
              <Home size={18} />
            </span>
            Rehaish
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#authNavbar"
            aria-controls="authNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="authNavbar">
            <ul className="navbar-nav align-items-lg-center gap-lg-2">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.label}>
                  <Link className="nav-pill" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="d-flex align-items-center ms-lg-3 mt-3 mt-lg-0">
              <Link className="btn btn-primary-soft" to="/landlord/create">
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="page-content auth-content">
        <div className="container container-wide">
          <div className="auth-card">
            <div className="row g-0">
              <div className="col-lg-6 auth-panel">
                <div className="auth-panel-inner">
                  <div className="auth-panel-brand">
                    <span className="brand-icon">
                      <Home size={18} />
                    </span>
                    <span className="fw-semibold">Rehaish</span>
                  </div>
                  <h2>Find Your Perfect Home</h2>
                  <p>
                    Join thousands of happy renters who found their dream home through Rehaish. Verified properties, trusted
                    agents, and hassle-free experiences.
                  </p>
                  <ul>
                    <li>Verified Properties<span>All properties verified by our professional team</span></li>
                    <li>Easy Booking<span>Schedule visits and book properties online</span></li>
                    <li>Find Flatmates<span>Connect with compatible roommates</span></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 auth-form-panel">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
