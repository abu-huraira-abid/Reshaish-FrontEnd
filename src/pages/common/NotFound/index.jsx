import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/common/Footer.jsx";

export default function NotFound() {
  return (
    <div className="page-shell">
      <main className="page-content">
        <div className="container container-wide">
          <div className="card p-4 text-center">
            <h2>Page not found</h2>
            <p className="text-muted">The page you are looking for does not exist.</p>
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
