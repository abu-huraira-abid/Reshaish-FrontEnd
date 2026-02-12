import React from "react";

export default function EmptyState({ title, message, action }) {
  return (
    <div className="card p-4 text-center">
      <h5>{title}</h5>
      <p className="text-muted">{message}</p>
      {action}
    </div>
  );
}
