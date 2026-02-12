import React from "react";
import { FileText, ShieldCheck, Users } from "lucide-react";

const items = [
  {
    title: "Verified by Agents",
    text: "All properties are thoroughly verified by our professional team to ensure quality and authenticity.",
    icon: ShieldCheck
  },
  {
    title: "Hassle-Free Docs",
    text: "Complete your rental agreements and documentation online with our secure platform.",
    icon: FileText
  },
  {
    title: "Find Flatmate",
    text: "Connect with compatible flatmates through our dedicated matching platform.",
    icon: Users
  }
];

export default function WhyChoose() {
  return (
    <section className="section-spacer why-section">
      <div className="container container-wide">
        <div className="text-center mb-4">
          <div className="section-title">Why Choose Rehaish</div>
          <div className="section-subtitle">Trusted by thousands of renters nationwide</div>
        </div>
        <div className="row g-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div className="col-md-4" key={item.title}>
                <div className="why-card h-100">
                  <div className="why-image">
                    <Icon size={32} />
                  </div>
                  <div className="why-body">
                    <div className="fw-semibold mb-2">{item.title}</div>
                    <div className="text-muted small">{item.text}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
