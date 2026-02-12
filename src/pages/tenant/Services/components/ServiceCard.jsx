import React from "react";
import { Bolt, Star } from "lucide-react";
import { formatCurrency } from "../../../../utils/helpers.js";

export default function ServiceCard({ service, onClick }) {
  return (
    <div className="card service-card h-100 cursor-pointer" onClick={onClick} role="button" tabIndex={0}>
      <div className="service-image">
        <img src={service.image} alt={service.title} />
        {service.popular && <span className="service-badge">Popular</span>}
        <span className="service-status" />
      </div>
      <div className="card-body d-flex flex-column">
        <h6 className="fw-semibold mb-1">{service.title}</h6>
        <div className="text-muted small mb-2">{service.vendor}</div>
        <p className="text-muted small mb-3">{service.description}</p>
        <div className="d-flex gap-2 flex-wrap mb-3">
          {(service.tags || []).map((tag) => (
            <span className="badge-soft" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="small text-muted d-flex align-items-center gap-2">
            <Star size={14} className="text-warning" fill="currentColor" />
            {service.rating} ({service.reviews})
            <span className="d-flex align-items-center gap-1">
              <Bolt size={14} className="text-warning" />
              {service.responseTime}
            </span>
          </div>
          <div className="text-end">
            <div className="text-muted small">Starting from</div>
            <div className="text-danger fw-semibold">{formatCurrency(service.price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
