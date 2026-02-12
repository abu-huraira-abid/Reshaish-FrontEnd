import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function RoleLayout({ title, navItems, action }) {
  const { logout } = useAuth();

  return (
    <div className="page-shell">
      <Navbar title={title} links={navItems} action={action} onLogout={logout} />
      <main className="page-content">
        <div className="container container-wide">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
