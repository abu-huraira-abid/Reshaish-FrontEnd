import React from "react";

export default function Stepper({ steps = [], current = 0 }) {
  return (
    <div className="d-flex align-items-center gap-3 flex-wrap">
      {steps.map((step, index) => {
        const isActive = index === current;
        const isDone = index < current;
        return (
          <div className="d-flex align-items-center gap-2" key={step}>
            <div
              className={`step-circle ${isActive ? "step-active" : isDone ? "step-done" : "step-inactive"}`}
            >
              {index + 1}
            </div>
            <span className={isActive ? "fw-semibold" : "text-muted"}>{step}</span>
            {index < steps.length - 1 && (
              <div className={`step-line ${isDone ? "step-line-active" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
