import React from "react";
import { useApp } from "../../context/AppContext.jsx";

export default function ToastStack() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card border-${toast.variant}`}>
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div>{toast.message}</div>
            <button
              className="btn btn-sm btn-light"
              onClick={() => removeToast(toast.id)}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
