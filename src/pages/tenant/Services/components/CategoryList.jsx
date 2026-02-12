import React from "react";
import { Package, Truck, Wifi, Wrench, Paintbrush, Sofa, Sparkles } from "lucide-react";

const iconMap = {
  all: Package,
  moving: Truck,
  internet: Wifi,
  maintenance: Wrench,
  painting: Paintbrush,
  furniture: Sofa,
  cleaning: Sparkles
};

export default function CategoryList({ items, active, onSelect }) {
  return (
    <div className="card category-card">
      <div className="fw-semibold mb-3">Categories</div>
      <div className="d-grid gap-2">
        {items.map((item) => {
          const Icon = iconMap[item.id] || Package;
          return (
            <button
              key={item.id}
              type="button"
              className={`category-item ${active === item.id ? "active" : ""}`}
              onClick={() => onSelect(item.id)}
            >
              <span className="d-flex align-items-center gap-2">
                <Icon size={14} />
                {item.label}
              </span>
              <span className="d-flex align-items-center gap-2">
                <span className={`category-count ${active === item.id ? "category-count-active" : ""}`}>
                  {item.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
