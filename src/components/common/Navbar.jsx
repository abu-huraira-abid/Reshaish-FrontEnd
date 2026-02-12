import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Bell, Home } from "lucide-react";

export default function Navbar({ title = "Rehaish", links = [], action, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container container-wide">
        <Link className="navbar-brand" to="/">
          <span className="brand-icon">
            <Home size={18} />
          </span>
          {title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
          <ul className="navbar-nav align-items-lg-center gap-lg-2">
            {links.map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}
                  to={link.to}
                  end={link.end}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center gap-3 ms-lg-3 mt-3 mt-lg-0">
            <button className="nav-bell" type="button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            {action}
            {onLogout && (
              <button className="btn btn-primary-soft" onClick={onLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
