import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const navLinks = [
  { label: "Find Properties", href: "#featured" },
  { label: "Flatmates", href: "#flatmates" },
  { label: "How It Works", href: "#how" },
  { label: "Login", href: "/auth/login" }
];

export default function LandingNavbar() {
  return (
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
          data-bs-target="#landingNavbar"
          aria-controls="landingNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="landingNavbar">
          <ul className="navbar-nav align-items-lg-center gap-lg-2">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.label}>
                {link.href.startsWith("/") ? (
                  <Link className="nav-pill" to={link.href}>
                    {link.label}
                  </Link>
                ) : (
                  <a className="nav-pill" href={link.href}>
                    {link.label}
                  </a>
                )}
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
  );
}
