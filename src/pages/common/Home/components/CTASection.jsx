import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="section-spacer cta-section">
      <div className="container container-wide">
        <div className="cta-banner text-center">
          <h3 className="fw-bold mb-2">Ready to Find Your Dream Home?</h3>
          <p className="mb-4">Join thousands of happy renters and landlords on Rehaish</p>
          <div className="cta-actions justify-content-center">
            <Link className="btn btn-light" to="/tenant/listings">Find Properties</Link>
            <Link className="btn btn-outline-light" to="/landlord/create">List Property</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
