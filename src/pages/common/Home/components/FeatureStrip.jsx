import React from "react";
import { FileCheck, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    title: "Verified by Agents",
    text: "Every property is verified by our professional team.",
    icon: ShieldCheck,
    tone: "feature-card--blue"
  },
  {
    title: "Online Your Docs",
    text: "Complete rental process digitally from anywhere.",
    icon: FileCheck,
    tone: "feature-card--pink"
  },
  {
    title: "Find Flatmate",
    text: "Discover and connect with compatible roommates.",
    icon: Users,
    tone: "feature-card--blue"
  }
];

export default function FeatureStrip() {
  return (
    <section className="section-spacer feature-section">
      <div className="container container-wide">
        <div className="row g-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div className="col-md-4" key={feature.title}>
                <div className={`feature-card h-100 ${feature.tone}`}>
                  <div className="feature-icon mb-3">
                    <Icon size={22} />
                  </div>
                  <div className="fw-semibold mb-1">{feature.title}</div>
                  <div className="text-muted small">{feature.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
