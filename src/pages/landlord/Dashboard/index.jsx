import React, { useEffect, useState } from "react";
import { Home, Users, FileText, DollarSign, AlertCircle, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "../../../components/common/Loading.jsx";
import StatCard from "./components/StatCard.jsx";
import ActivityCard from "./components/ActivityCard.jsx";
import LandlordPropertyCard from "./components/LandlordPropertyCard.jsx";
import { fetchLandlordDashboard } from "../../../services/api/landlordDashboard.js";
import { apiClient, unwrapData } from "../../../services/api/client.js";

const statIcons = [Home, Users, FileText, DollarSign];

export default function LandlordDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [tenancies, setTenancies] = useState([]);
  const [issues, setIssues] = useState([]);
  const [noticeForm, setNoticeForm] = useState({
    tenancy: "",
    moveOutDate: "",
    reason: ""
  });

  useEffect(() => {
    fetchLandlordDashboard().then((data) => setDashboard(data));
    Promise.all([
      apiClient.get("/rental-tenancies/"),
      apiClient.get("/property-issues/")
    ]).then(([tenancyResponse, issueResponse]) => {
      const tenancyData = unwrapData(tenancyResponse);
      const issueData = unwrapData(issueResponse);
      setTenancies(tenancyData);
      setIssues(issueData);
    });
  }, []);

  const submitLeaveNotice = async (event) => {
    event.preventDefault();
    try {
      await apiClient.post("/leave-notices/", {
        tenancy: noticeForm.tenancy,
        notice_date: new Date().toISOString().slice(0, 10),
        move_out_date: noticeForm.moveOutDate,
        reason: noticeForm.reason
      });
      toast.success("Leave notice sent to tenant and admin.");
      setNoticeForm({ tenancy: "", moveOutDate: "", reason: "" });
    } catch (error) {
      toast.error(error.message || "Unable to submit leave notice.");
    }
  };

  const updateIssueStatus = async (issueId, status) => {
    try {
      const { data } = await apiClient.patch(`/property-issues/${issueId}/`, {
        status
      });
      setIssues((prev) => prev.map((issue) => (issue.id === issueId ? data : issue)));
      toast.success("Issue status updated.");
    } catch (error) {
      toast.error(error.message || "Unable to update issue.");
    }
  };

  if (!dashboard) {
    return <Loading label="Loading dashboard" />;
  }

  const stats = dashboard.stats || [];
  const requests = dashboard.requests || [];
  const payments = dashboard.payments || [];
  const properties = dashboard.properties || [];

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Dashboard</div>
        <div className="section-subtitle">
          Overview of your properties, requests, and income.
        </div>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((stat, index) => {
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
            items={requests}
            statusTone="pending"
          />
        </div>
        <div className="col-12 col-lg-6">
          <ActivityCard
            title="Recent Payments"
            items={payments}
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
        {properties.map((property) => (
          <div className="col-12 col-md-6" key={property.id}>
            <LandlordPropertyCard property={property} />
          </div>
        ))}
      </div>

      <div className="row g-4 mt-4">
        <div className="col-lg-6">
          <div className="card p-4 h-100">
            <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
              <AlertCircle size={17} />
              Tenant Property Issues
            </div>
            <div className="d-grid gap-2">
              {issues.slice(0, 5).map((issue) => (
                <div className="card-soft p-3" key={issue.id}>
                  <div className="d-flex justify-content-between gap-2">
                    <div className="fw-semibold">{issue.title}</div>
                    <span className="badge-pill badge-pending">{issue.status}</span>
                  </div>
                  <div className="text-muted small">{issue.property_title}</div>
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-light border btn-sm"
                      onClick={() => updateIssueStatus(issue.id, "processing")}
                      type="button"
                    >
                      Processing
                    </button>
                    <button
                      className="btn btn-primary-soft btn-sm"
                      onClick={() => updateIssueStatus(issue.id, "resolved")}
                      type="button"
                    >
                      Resolved
                    </button>
                  </div>
                </div>
              ))}
              {!issues.length && (
                <div className="text-muted small">No issues reported yet.</div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <form className="card p-4 h-100" onSubmit={submitLeaveNotice}>
            <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
              <LogOut size={17} />
              Notice Tenant to Leave
            </div>
            <div className="d-grid gap-3">
              <select
                className="form-select"
                required
                value={noticeForm.tenancy}
                onChange={(event) => setNoticeForm((prev) => ({ ...prev, tenancy: event.target.value }))}
              >
                <option value="">Select active tenancy</option>
                {tenancies
                  .filter((tenancy) => ["active", "notice_given"].includes(tenancy.status))
                  .map((tenancy) => (
                    <option key={tenancy.id} value={tenancy.id}>
                      {tenancy.property_title}
                    </option>
                  ))}
              </select>
              <input
                className="form-control"
                min={new Date().toISOString().slice(0, 10)}
                required
                type="date"
                value={noticeForm.moveOutDate}
                onChange={(event) => setNoticeForm((prev) => ({ ...prev, moveOutDate: event.target.value }))}
              />
              <textarea
                className="form-control"
                placeholder="Reason for notice"
                required
                rows={4}
                value={noticeForm.reason}
                onChange={(event) => setNoticeForm((prev) => ({ ...prev, reason: event.target.value }))}
              />
              <button className="btn btn-light border" type="submit">
                Submit Notice
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
