import React from "react";
import {
  Banknote,
  ClipboardList,
  Home,
  MessageCircle,
  Settings,
  Users,
  Wrench
} from "lucide-react";
import RoleLayout from "./RoleLayout.jsx";

const navItems = [
  { label: "Services", to: "/tenant/services", icon: Wrench },
  { label: "Flatmates", to: "/tenant/flatmates", icon: Users },
  { label: "Messages", to: "/tenant/messages", icon: MessageCircle },
  { label: "My Rental", to: "/tenant/property-history", icon: ClipboardList },
  { label: "Rent & Bills", to: "/tenant/rent-bills", icon: Home },
  { label: "Payments", to: "/tenant/payments", icon: Banknote },
  { label: "Settings", to: "/tenant/settings", icon: Settings }
];

export default function TenantLayout() {
  return <RoleLayout title="Rehaish" navItems={navItems} />;
}
