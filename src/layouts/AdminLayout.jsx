import React from "react";
import RoleLayout from "./RoleLayout.jsx";

const navItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Listing Moderation", to: "/admin/moderation" },
  { label: "Audit Logs", to: "/admin/audit" }
];

export default function AdminLayout() {
  return <RoleLayout title="Rehaish" navItems={navItems} />;
}
