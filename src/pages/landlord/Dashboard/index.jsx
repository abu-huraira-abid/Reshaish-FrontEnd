import React, { useEffect, useState } from "react";
import { Home, Users, FileText, DollarSign } from "lucide-react";
import Loading from "../../../components/common/Loading.jsx";
import StatCard from "./components/StatCard.jsx";
import ActivityCard from "./components/ActivityCard.jsx";
import LandlordPropertyCard from "./components/LandlordPropertyCard.jsx";
import { fetchLandlordDashboard } from "../../../services/mock/landlordDashboard.js";

const statIcons = [Home, Users, FileText, DollarSign];

export default function LandlordDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchLandlordDashboard().then((data) => setDashboard(data));
  }, []);

  if (!dashboard) {
    return <Loading label="Loading dashboard" />;
  }

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Dashboard</div>
        <div className="section-subtitle">
          Overview of your properties, requests, and income.
        </div>
      </div>

      <div className="row g-3 mb-4">
        {dashboard.stats.map((stat, index) => {
          const Icon = statIcons[index] || Home;
          return (
            <div className="col-12 col-md-6 col-lg-3" key={stat.label}>
              <StatCard
                label={stat.label}
                value={stat.value}
                icon={Icon}
                tone={stat.tone}
              />
            </div>
          );
        })}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <ActivityCard
            title="Recent Requests"
            items={dashboard.requests}
            statusTone="pending"
          />
        </div>
        <div className="col-12 col-lg-6">
          <ActivityCard
            title="Recent Payments"
            items={dashboard.payments}
            statusTone="paid"
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="section-title">My Properties</div>
        <a className="intent-link" href="/landlord/listings">
          View All
        </a>
      </div>
      <div className="row g-3">
        {dashboard.properties.map((property) => (
          <div className="col-12 col-md-6" key={property.id}>
            <LandlordPropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
}
