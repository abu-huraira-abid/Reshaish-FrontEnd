import React from "react";

export default function Stepper({ steps = [], current = 0, onStepClick }) {
  return (
    <div className="d-flex align-items-center gap-3 flex-wrap">
      {steps.map((step, index) => {
        const isActive = index === current;
        const isDone = index < current;
        const StepTag = onStepClick ? "button" : "div";
        return (
          <div className="d-flex align-items-center gap-2" key={step}>
            <StepTag
              className={`stepper-step ${onStepClick ? "clickable" : ""}`}
              onClick={onStepClick ? () => onStepClick(index) : undefined}
              type={onStepClick ? "button" : undefined}
            >
              <span
                className={`step-circle ${isActive ? "step-active" : isDone ? "step-done" : "step-inactive"}`}
              >
                {index + 1}
              </span>
              <span className={isActive ? "fw-semibold" : "text-muted"}>{step}</span>
            </StepTag>
            {index < steps.length - 1 && (
              <div className={`step-line ${isDone ? "step-line-active" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
