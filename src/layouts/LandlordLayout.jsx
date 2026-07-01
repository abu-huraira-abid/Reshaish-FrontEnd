import React from "react";
import { Link } from "react-router-dom";
import { Gauge, Home, Inbox, Settings } from "lucide-react";
import RoleLayout from "./RoleLayout.jsx";

const navItems = [
  { label: "Dashboard", to: "/landlord", icon: Gauge, end: true },
  { label: "My Properties", to: "/landlord/listings", icon: Home },
  { label: "Requests", to: "/landlord/intents", icon: Inbox },
  { label: "Settings", to: "/landlord/settings", icon: Settings }
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
