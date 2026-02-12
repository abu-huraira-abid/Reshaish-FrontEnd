import React from "react";
import { Link } from "react-router-dom";
import RoleLayout from "./RoleLayout.jsx";

const navItems = [
  { label: "Dashboard", to: "/landlord", end: true },
  { label: "My Properties", to: "/landlord/listings" },
  { label: "Requests", to: "/landlord/intents" }
];

export default function LandlordLayout() {
  return (
    <RoleLayout
      title="Rehaish"
      navItems={navItems}
      action={<Link className="btn btn-primary-soft" to="/landlord/create">Add Property</Link>}
    />
  );
}
