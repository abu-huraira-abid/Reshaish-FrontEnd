import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastStack() {
  return (
    <Toaster
      position="top-right"
      gutter={10}
      toastOptions={{
        duration: 4200,
        className: "rehaish-toast",
        success: {
          iconTheme: {
            primary: "#16a34a",
            secondary: "#ffffff"
          }
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff"
          }
        }
      }}
    />
  );
}
