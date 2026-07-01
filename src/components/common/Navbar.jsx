import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { fetchNotifications } from "../../services/api/notifications.js";

export default function Navbar({ title = "Rehaish", links = [], action, onLogout }) {
  const { user, roleHome } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const brandTarget = user ? roleHome[user.role] || "/" : "/";

  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      return;
    }

    let mounted = true;
    fetchNotifications()
      .then((notifications) => {
        if (!mounted) return;
        setUnreadCount(
          notifications.filter((notification) => !notification.read_at).length
        );
      })
      .catch(() => {
        if (mounted) setUnreadCount(0);
      });

    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container container-wide">
        <Link className="navbar-brand" to={brandTarget}>
          <span className="brand-icon">
            <img src="/rehaish-logo.png" alt="Rehaish logo" />
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
                  {link.icon && <link.icon size={16} />}
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center gap-3 ms-lg-3 mt-3 mt-lg-0">
            <Link
              className="nav-bell"
              to={`${brandTarget.replace(/\/$/, "")}/notifications`}
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="nav-bell-badge">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
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
