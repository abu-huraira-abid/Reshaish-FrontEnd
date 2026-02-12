import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ items = [] }) {
  return (
    <aside className="sidebar bg-white border-end">
      <div className="p-3">
        <div className="text-uppercase text-muted small mb-2">Navigation</div>
        <nav className="nav flex-column gap-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link rounded ${isActive ? "active fw-semibold" : "text-muted"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
