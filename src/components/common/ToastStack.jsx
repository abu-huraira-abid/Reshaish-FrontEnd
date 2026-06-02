import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastStack() {
  return (
    <Toaster
      position="top-right"
      gutter={10}
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: "8px",
          border: "1px solid rgba(15, 23, 42, 0.08)",
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.14)",
          color: "#111827",
          fontSize: "0.92rem",
          maxWidth: "380px"
        },
        success: {
          iconTheme: {
            primary: "#198754",
            secondary: "#ffffff"
          }
        },
        error: {
          iconTheme: {
            primary: "#dc3545",
            secondary: "#ffffff"
          }
        }
      }}
    />
  );
}
