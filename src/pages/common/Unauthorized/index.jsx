import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/common/Footer.jsx";

export default function Unauthorized() {
  return (
    <div className="page-shell">
      <main className="page-content">
        <div className="container container-wide">
          <div className="card p-4 text-center">
            <h2>Access denied</h2>
            <p className="text-muted">You do not have permission to view this page.</p>
            <Link className="btn btn-primary-soft" to="/">
              Go Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
