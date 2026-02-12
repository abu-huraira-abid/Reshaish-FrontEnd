import React from "react";
import RoleLayout from "./RoleLayout.jsx";

const navItems = [
  { label: "Dashboard", to: "/agent", end: true },
  { label: "Verifications", to: "/agent/verifications" },
  { label: "Schedule", to: "/agent/visits" },
  { label: "QR Scanner", to: "/agent/qr-support" }
];

export default function AgentLayout() {
  return <RoleLayout title="Rehaish" navItems={navItems} />;
}
