import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container container-wide">
        <div className="row g-4">
          <div className="col-md-3">
            <h6>Rehaish</h6>
            <p className="text-muted small mb-0">
              Your trusted partner in finding the perfect rental home.
            </p>
          </div>
          <div className="col-md-3">
            <h6>Company</h6>
            <div className="d-grid gap-2">
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
              <a href="#">Blog</a>
            </div>
          </div>
          <div className="col-md-3">
            <h6>Support</h6>
            <div className="d-grid gap-2">
              <a href="#">Help Center</a>
              <a href="#">Safety</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
          <div className="col-md-3">
            <h6>Legal</h6>
            <div className="d-grid gap-2">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">© {year} Rehaish. All rights reserved.</div>
      </div>
    </footer>
  );
}
