import React from "react";
import {
  ClipboardCheck,
  FileText,
  Gauge,
  ScrollText,
  Settings,
  Users
} from "lucide-react";
import RoleLayout from "./RoleLayout.jsx";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: Gauge, end: true },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Onboarding Approvals", to: "/admin/onboarding", icon: ClipboardCheck },
  { label: "Listing Moderation", to: "/admin/moderation", icon: FileText },
  { label: "Audit Logs", to: "/admin/audit", icon: ScrollText },
  { label: "Settings", to: "/admin/settings", icon: Settings }
];

export default function AdminLayout() {
  return <RoleLayout title="Rehaish" navItems={navItems} />;
}
