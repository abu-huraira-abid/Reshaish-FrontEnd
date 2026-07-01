import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Home,
  LogOut,
  MapPin,
  Wrench
} from "lucide-react";
import toast from "react-hot-toast";
import { apiClient, unwrapData } from "../../../services/api/client.js";
import Loading from "../../../components/common/Loading.jsx";
import { formatCurrency } from "../../../utils/helpers.js";

const statusLabel = (value) =>
  String(value || "")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function PropertyHistory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedTenancyId = searchParams.get("tenancy") || "";
  const [tenancies, setTenancies] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [issues, setIssues] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [issueForm, setIssueForm] = useState({
    tenancy: "",
    title: "",
    description: "",
    priority: "medium"
  });
  const [noticeForm, setNoticeForm] = useState({
    tenancy: "",
    moveOutDate: "",
    reason: ""
  });

  const activeTenancies = useMemo(
    () => tenancies.filter((item) => ["active", "notice_given"].includes(item.status)),
    [tenancies]
  );
  const activeTenancyPropertyIds = useMemo(
    () => new Set(activeTenancies.map((tenancy) => String(tenancy.property))),
    [activeTenancies]
  );
  const inProcessAgreements = useMemo(
    () =>
      agreements.filter(
        (agreement) =>
          ["pending_acceptance", "payment_pending"].includes(agreement.status) &&
          !activeTenancyPropertyIds.has(String(agreement.property))
      ),
    [activeTenancyPropertyIds, agreements]
  );

  const loadRentals = async () => {
    setLoading(true);
    try {
      const [tenancyData, issueData, noticeData, agreementData] = await Promise.all([
        unwrapData(await apiClient.get("/rental-tenancies/")),
        unwrapData(await apiClient.get("/property-issues/")),
        unwrapData(await apiClient.get("/leave-notices/")),
        unwrapData(await apiClient.get("/agreements/"))
      ]);
      setTenancies(tenancyData);
      setIssues(issueData);
      setNotices(noticeData);
      setAgreements(agreementData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRentals();
  }, []);

  useEffect(() => {
    if (!selectedTenancyId || !activeTenancies.some((tenancy) => String(tenancy.id) === String(selectedTenancyId))) {
      return;
    }

    setIssueForm((prev) => ({ ...prev, tenancy: selectedTenancyId }));
    setNoticeForm((prev) => ({ ...prev, tenancy: selectedTenancyId }));
  }, [activeTenancies, selectedTenancyId]);

  const submitIssue = async (event) => {
    event.preventDefault();
    try {
      await apiClient.post("/property-issues/", {
        tenancy: issueForm.tenancy,
        title: issueForm.title,
        description: issueForm.description,
        priority: issueForm.priority
      });
      toast.success("Issue reported to landlord and admin.");
      setIssueForm({ tenancy: "", title: "", description: "", priority: "medium" });
      loadRentals();
    } catch (error) {
      toast.error(error.message || "Unable to report issue.");
    }
  };

  const submitNotice = async (event) => {
    event.preventDefault();
    try {
      await apiClient.post("/leave-notices/", {
        tenancy: noticeForm.tenancy,
        notice_date: new Date().toISOString().slice(0, 10),
        move_out_date: noticeForm.moveOutDate,
        reason: noticeForm.reason
      });
      toast.success("Leave notice submitted.");
      setNoticeForm({ tenancy: "", moveOutDate: "", reason: "" });
      loadRentals();
    } catch (error) {
      toast.error(error.message || "Unable to submit leave notice.");
    }
  };

  if (loading) {
    return <Loading label="Loading rental history" />;
  }

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Property History</div>
        <div className="section-subtitle">
          Track rented houses, report property issues, and submit leave notices.
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-tile">
            <Home size={18} className="text-danger" />
            <div>
              <div className="fw-semibold">{tenancies.length}</div>
              <div className="text-muted small">Active rental records</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-tile">
            <CheckCircle2 size={18} className="text-success" />
            <div>
              <div className="fw-semibold">{activeTenancies.length}</div>
              <div className="text-muted small">Active tenancies</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-tile">
            <AlertCircle size={18} className="text-warning" />
            <div>
              <div className="fw-semibold">{issues.length}</div>
              <div className="text-muted small">Reported issues</div>
            </div>
          </div>
        </div>
      </div>

      {inProcessAgreements.length > 0 && (
        <div className="card p-4 mb-4">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
            <div>
              <div className="fw-semibold">Agreements in Process</div>
              <div className="text-muted small">
                These properties are reserved for your rental flow and hidden from public search.
              </div>
            </div>
            <span className="badge-pill badge-info">{inProcessAgreements.length} in progress</span>
          </div>
          <div className="d-grid gap-3">
            {inProcessAgreements.map((agreement) => {
              const property = agreement.property_detail || {};
              const isPaymentPending = agreement.status === "payment_pending";

              return (
                <div className="card-soft p-3" key={agreement.id}>
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                    <div>
                      <div className="fw-semibold">{property.title || `Property #${agreement.property}`}</div>
                      <div className="text-muted small d-flex align-items-center gap-2">
                        <MapPin size={14} />
                        {[property.address, property.city].filter(Boolean).join(", ") || "Address pending"}
                      </div>
                      <div className="text-muted small mt-2">
                        {isPaymentPending
                          ? "Landlord accepted. Review agreement and complete payment to start tenancy."
                          : "Waiting for landlord acceptance."}
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-end gap-2">
                      <span className={`badge-pill ${isPaymentPending ? "badge-verified" : "badge-pending"}`}>
                        {isPaymentPending ? "Payment Pending" : "Pending Landlord"}
                      </span>
                      {isPaymentPending && (
                        <button
                          className="btn btn-primary-soft btn-sm"
                          type="button"
                          onClick={() => navigate(`/tenant/agreement-preview/${agreement.property}`)}
                        >
                          <Calendar size={14} className="me-1" />
                          Continue
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="d-grid gap-3 mb-4">
        {tenancies.map((tenancy) => (
          <div className="card p-3" key={tenancy.id}>
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div>
                <div className="fw-semibold">{tenancy.property_title}</div>
                <div className="text-muted small d-flex align-items-center gap-2">
                  <MapPin size={14} />
                  {tenancy.property_address}, {tenancy.property_city}
                </div>
                <div className="text-muted small mt-2 d-flex flex-wrap gap-3">
                  <span>Rent: {formatCurrency(tenancy.rent_amount)}</span>
                  <span>Security: {formatCurrency(tenancy.security_deposit)}</span>
                  <span>Platform fee: {formatCurrency(tenancy.platform_fee)}</span>
                </div>
              </div>
              <span className={`badge-pill ${tenancy.status === "active" ? "badge-verified" : "badge-info"}`}>
                {statusLabel(tenancy.status)}
              </span>
            </div>
          </div>
        ))}
        {!tenancies.length && !inProcessAgreements.length && (
          <div className="card p-4 text-muted">No rental history yet.</div>
        )}
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <form className="card p-4 h-100" onSubmit={submitIssue}>
            <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
              <Wrench size={17} />
              Report Property Issue
            </div>
            <div className="d-grid gap-3">
              <select
                className="form-select"
                required
                value={issueForm.tenancy}
                onChange={(event) => setIssueForm((prev) => ({ ...prev, tenancy: event.target.value }))}
              >
                <option value="">Select active rental</option>
                {activeTenancies.map((tenancy) => (
                  <option key={tenancy.id} value={tenancy.id}>
                    {tenancy.property_title}
                  </option>
                ))}
              </select>
              <input
                className="form-control"
                placeholder="Issue title"
                required
                value={issueForm.title}
                onChange={(event) => setIssueForm((prev) => ({ ...prev, title: event.target.value }))}
              />
              <select
                className="form-select"
                value={issueForm.priority}
                onChange={(event) => setIssueForm((prev) => ({ ...prev, priority: event.target.value }))}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <textarea
                className="form-control"
                placeholder="Describe the issue"
                required
                rows={4}
                value={issueForm.description}
                onChange={(event) => setIssueForm((prev) => ({ ...prev, description: event.target.value }))}
              />
              <button className="btn btn-primary-soft" type="submit">
                Submit Issue
              </button>
            </div>
          </form>
        </div>

        <div className="col-lg-6">
          <form className="card p-4 h-100" onSubmit={submitNotice}>
            <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
              <LogOut size={17} />
              Notice to Leave House
            </div>
            <div className="d-grid gap-3">
              <select
                className="form-select"
                required
                value={noticeForm.tenancy}
                onChange={(event) => setNoticeForm((prev) => ({ ...prev, tenancy: event.target.value }))}
              >
                <option value="">Select active rental</option>
                {activeTenancies.map((tenancy) => (
                  <option key={tenancy.id} value={tenancy.id}>
                    {tenancy.property_title}
                  </option>
                ))}
              </select>
              <label className="form-label mb-0">
                Move-out date
                <input
                  className="form-control mt-2"
                  min={new Date().toISOString().slice(0, 10)}
                  required
                  type="date"
                  value={noticeForm.moveOutDate}
                  onChange={(event) => setNoticeForm((prev) => ({ ...prev, moveOutDate: event.target.value }))}
                />
              </label>
              <textarea
                className="form-control"
                placeholder="Reason for leaving"
                required
                rows={4}
                value={noticeForm.reason}
                onChange={(event) => setNoticeForm((prev) => ({ ...prev, reason: event.target.value }))}
              />
              <button className="btn btn-light border" type="submit">
                Submit Leave Notice
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-lg-6">
          <div className="card p-4">
            <div className="fw-semibold mb-3">Issue Status</div>
            <div className="d-grid gap-2">
              {issues.map((issue) => (
                <div className="card-soft p-3" key={issue.id}>
                  <div className="d-flex justify-content-between gap-2">
                    <div className="fw-semibold">{issue.title}</div>
                    <span className="badge-pill badge-pending">{statusLabel(issue.status)}</span>
                  </div>
                  <div className="text-muted small">{issue.property_title}</div>
                </div>
              ))}
              {!issues.length && <div className="text-muted small">No issues reported.</div>}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card p-4">
            <div className="fw-semibold mb-3">Leave Notices</div>
            <div className="d-grid gap-2">
              {notices.map((notice) => (
                <div className="card-soft p-3" key={notice.id}>
                  <div className="d-flex justify-content-between gap-2">
                    <div className="fw-semibold">{notice.property_title}</div>
                    <span className="badge-pill badge-info">{statusLabel(notice.status)}</span>
                  </div>
                  <div className="text-muted small">
                    Move-out: {notice.move_out_date}
                  </div>
                </div>
              ))}
              {!notices.length && <div className="text-muted small">No leave notices.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
