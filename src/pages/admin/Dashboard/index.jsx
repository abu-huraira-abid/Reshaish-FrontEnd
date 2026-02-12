import React, { useEffect, useState } from "react";
import StatCard from "./components/StatCard.jsx";
import { fetchAdminStats } from "../../../services/mock/admin.js";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAdminStats().then(setStats);
  }, []);

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Admin Dashboard</div>
        <div className="section-subtitle">Monitor platform activity and approvals.</div>
      </div>
      <div className="row g-3">
        <div className="col-md-4">
          <StatCard label="Pending Verifications" value={stats?.pendingVerifications || 0} icon="⌁" />
        </div>
        <div className="col-md-4">
          <StatCard label="Active Agreements" value={stats?.activeAgreements || 0} icon="⌂" />
        </div>
        <div className="col-md-4">
          <StatCard label="Payments (This Month)" value={stats?.paymentsThisMonth || 0} icon="PKR" />
        </div>
      </div>
    </div>
  );
}
