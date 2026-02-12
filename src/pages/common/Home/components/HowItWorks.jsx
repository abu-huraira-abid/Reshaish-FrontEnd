import React from "react";

const steps = [
  {
    number: "1",
    title: "Search & Explore",
    text: "Find properties that match your preferences"
  },
  {
    number: "2",
    title: "Book & Visit",
    text: "Schedule visits at your convenience"
  },
  {
    number: "3",
    title: "Move In",
    text: "Complete paperwork and move into your new home"
  }
];

export default function HowItWorks() {
  return (
    <section className="section-spacer how-section" id="how">
      <div className="container container-wide">
        <div className="text-center mb-4">
          <div className="section-title">How It Works</div>
        </div>
        <div className="row g-3 justify-content-center">
          {steps.map((step) => (
            <div className="col-md-4" key={step.title}>
              <div className="step-item text-center">
                <div className="step-circle">{step.number}</div>
                <div className="fw-semibold mt-3">{step.title}</div>
                <div className="text-muted small">{step.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
