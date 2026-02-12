import React from "react";

export default function Timeline({ items = [] }) {
  return (
    <ul className="timeline list-unstyled">
      {items.map((item, index) => (
        <li className="timeline-item" key={`${item.label}-${index}`}>
          <div className={`timeline-dot ${item.active ? "bg-dark" : "bg-light"}`} />
          <div>
            <div className={item.active ? "fw-semibold" : "text-muted"}>{item.label}</div>
            {item.description && <div className="small text-muted">{item.description}</div>}
          </div>
        </li>
      ))}
    </ul>
  );
}
