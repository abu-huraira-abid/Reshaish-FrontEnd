import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ClipboardCheck,
  Clock,
  FileText,
  MapPin,
  QrCode,
  TrendingUp,
  Wrench
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/common/Loading.jsx";
import { fetchAgentDashboard } from "../../../services/mock/agentDashboard.js";

const statIcons = [ClipboardCheck, Clock, AlertCircle, CheckCircle];
const actionIcons = [ClipboardCheck, Calendar, QrCode, Wrench];
const performanceIcons = [FileText, Calendar, CheckCircle];

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchAgentDashboard().then((data) => setDashboard(data));
  }, []);

  if (!dashboard) {
    return <Loading label="Loading dashboard" />;
  }

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Agent Dashboard</div>
        <div className="section-subtitle">Welcome back! Here&apos;s your overview for today.</div>
      </div>

      <div className="row g-3 mb-4">
        {dashboard.stats.map((stat, index) => {
          const Icon = statIcons[index] || ClipboardCheck;
          return (
            <div className="col-12 col-md-6 col-lg-3" key={stat.label}>
              <div className="card agent-stat-card h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className={`agent-stat-icon ${stat.tone}`}>
                    <Icon size={20} />
                  </div>
                  <TrendingUp size={18} className="text-success" />
                </div>
                <div className="agent-stat-value">{stat.value}</div>
                <div className="text-muted small">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-4">
        <div className="fw-semibold mb-3">Quick Actions</div>
        <div className="row g-3">
          {dashboard.quickActions.map((action, index) => {
            const Icon = actionIcons[index] || ClipboardCheck;
            return (
              <div className="col-12 col-md-6 col-lg-3" key={action.title}>
                <button
                  type="button"
                  className="agent-action-card"
                  onClick={() => navigate(action.path)}
                >
                  <div className={`agent-action-icon ${action.tone}`}>
                    <Icon size={20} />
                  </div>
                  <div className="fw-semibold">{action.title}</div>
                  <div className="text-muted small">{action.description}</div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-6">
          <div className="card agent-panel-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-semibold">Recent Verifications</div>
              <button
                type="button"
                className="btn btn-link p-0 text-danger"
                onClick={() => navigate("/agent/verifications")}
              >
                View All →
              </button>
            </div>
            <div className="d-grid gap-3">
              {dashboard.recentVerifications.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="agent-card-item"
                  onClick={() => navigate(`/agent/verification-form`)}
                >
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div className="flex-grow-1">
                      <div className="fw-semibold mb-1">{item.title}</div>
                      <div className="text-muted small d-flex align-items-center gap-2">
                        <MapPin size={14} />
                        {item.location}
                      </div>
                    </div>
                    <span className={`agent-badge priority-${item.priority}`}>
                      {item.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className={`agent-badge status-${item.status}`}>
                      {item.status.replace("-", " ")}
                    </span>
                    <span className="text-muted small">
                      Due: {new Date(item.dueDate).toLocaleDateString("en-PK")}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card agent-panel-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-semibold">Upcoming Visits</div>
              <button
                type="button"
                className="btn btn-link p-0 text-danger"
                onClick={() => navigate("/agent/visits")}
              >
                View Schedule →
              </button>
            </div>
            <div className="d-grid gap-3">
              {dashboard.upcomingVisits.map((visit) => (
                <div className="agent-card-item" key={visit.id}>
                  <div className="d-flex align-items-start gap-3">
                    <div className="agent-chip blue">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="fw-semibold">{visit.property}</div>
                      <div className="text-muted small">{visit.time}</div>
                      <div className="text-muted small">Tenant: {visit.tenant}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card agent-panel-card">
        <div className="fw-semibold mb-3">This Month&apos;s Performance</div>
        <div className="row g-3">
          {dashboard.performance.map((item, index) => {
            const Icon = performanceIcons[index] || FileText;
            return (
              <div className="col-12 col-md-4" key={item.label}>
                <div className="agent-performance-card">
                  <div className={`agent-performance-icon ${item.tone}`}>
                    <Icon size={22} />
                  </div>
                  <div className="agent-performance-value">{item.value}</div>
                  <div className="text-muted small">{item.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
