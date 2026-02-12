import React from "react";
import RoleLayout from "./RoleLayout.jsx";

const navItems = [
  { label: "Search", to: "/tenant/listings" },
  { label: "Services", to: "/tenant/services" },
  { label: "Flatmates", to: "/tenant/flatmates" },
  { label: "Messages", to: "/tenant/messages" },
  { label: "Rent & Bills", to: "/tenant/rent-bills" },
  { label: "Payments", to: "/tenant/payments" }
];

export default function TenantLayout() {
  return <RoleLayout title="Rehaish" navItems={navItems} />;
}
