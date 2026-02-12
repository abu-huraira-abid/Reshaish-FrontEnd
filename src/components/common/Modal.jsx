import React from "react";

export default function Modal({ open, title, children, onClose, actions }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop-custom">
      <div className="modal-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">{title}</h5>
          <button className="btn btn-sm btn-light" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mb-3">{children}</div>
        {actions && <div className="d-flex gap-2 justify-content-end">{actions}</div>}
      </div>
    </div>
  );
}
