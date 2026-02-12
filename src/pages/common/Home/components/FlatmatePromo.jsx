import React from "react";
import { Link } from "react-router-dom";

export default function FlatmatePromo() {
  return (
    <section className="section-spacer" id="flatmates">
      <div className="container container-wide">
        <div className="promo-card">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <div className="section-title">Find a Flatmate</div>
              <div className="promo-subtitle">Meet your match</div>
              <p className="text-muted mb-4">
                Looking for a roommate? Connect with potential flatmates looking to share.
              </p>
              <Link className="btn btn-primary-soft promo-cta" to="/tenant/flatmates">
                Find a Roommate
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="promo-image-wrap">
                <img
                  className="promo-image"
                  src="https://images.unsplash.com/photo-1571666522239-9a0e222c5f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHJvb21tYXRlcyUyMGZyaWVuZHN8ZW58MXx8fHwxNzY2NDM2NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Find a flatmate"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
