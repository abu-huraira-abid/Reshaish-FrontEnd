import React from "react";
import { Box, ShieldCheck, Star, TrendingUp } from "lucide-react";

const stats = [
  { label: "Services Available", value: "24+", icon: <Box size={18} />, tone: "#dbeafe" },
  { label: "Verified Partners", value: "100%", icon: <ShieldCheck size={18} />, tone: "#dcfce7" },
  { label: "Average Rating", value: "4.8", icon: <Star size={18} />, tone: "#fef3c7" },
  { label: "Happy Customers", value: "10k+", icon: <TrendingUp size={18} />, tone: "#f3e8ff" }
];

export default function StatsGrid() {
  return (
    <div className="row g-3 mb-4">
      {stats.map((stat) => (
        <div className="col-md-3" key={stat.label}>
          <div className="service-stat-card">
            <div className="service-stat-icon" style={{ background: stat.tone }}>
              {stat.icon}
            </div>
            <div className="service-stat-value">{stat.value}</div>
            <div className="text-muted small">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
