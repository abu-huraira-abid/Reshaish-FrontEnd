import React from "react";
import { CalendarClock, Gauge, QrCode, Settings, ShieldCheck } from "lucide-react";
import RoleLayout from "./RoleLayout.jsx";

const navItems = [
  { label: "Dashboard", to: "/agent", icon: Gauge, end: true },
  { label: "Verifications", to: "/agent/verifications", icon: ShieldCheck },
  { label: "Schedule", to: "/agent/visits", icon: CalendarClock },
  { label: "QR Scanner", to: "/agent/qr-support", icon: QrCode },
  { label: "Settings", to: "/agent/settings", icon: Settings }
];

export default function AgentLayout() {
  return <RoleLayout title="Rehaish" navItems={navItems} />;
}
