import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  FileText,
  ShieldCheck,
  XCircle
} from "lucide-react";
import toast from "react-hot-toast";
import DataPagination from "../../../components/common/DataPagination.jsx";
import {
  approveOnboardingRequest,
  fetchOnboardingRequests,
  rejectOnboardingRequest
} from "../../../services/api/admin.js";

const statusLabel = (value) =>
  String(value || "")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

function Detail({ label, value }) {
  return (
    <div>
      <div className="small text-muted">{label}</div>
      <div className="fw-semibold">{value || "Not provided"}</div>
    </div>
  );
}

export default function OnboardingApprovals() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectReason, setRejectReason] = useState({});
  const [actionLoading, setActionLoading] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchOnboardingRequests()
      .then(setRequests)
      .catch((error) =>
        toast.error(error.message || "Unable to load onboarding requests.")
      )
      .finally(() => setLoading(false));
  }, []);

  const pendingCount = useMemo(
    () => requests.filter((item) => item.status === "pending_review").length,
    [requests]
  );
  const pagedRequests = useMemo(
    () => requests.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize, requests]
  );

  const updateRequest = (updated) => {
    setRequests((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleApprove = async (id) => {
    setActionLoading((prev) => ({ ...prev, [id]: "approve" }));
    try {
      const updated = await approveOnboardingRequest(id);
      updateRequest(updated);
      toast.success("Onboarding request approved.");
    } catch (error) {
      toast.error(error.message || "Unable to approve request.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleReject = async (id) => {
    const reason = rejectReason[id]?.trim();
    if (!reason) {
      toast.error("Add a rejection reason before rejecting.");
      return;
    }

    setActionLoading((prev) => ({ ...prev, [id]: "reject" }));
    try {
      const updated = await rejectOnboardingRequest(id, reason);
      updateRequest(updated);
      setRejectReason((prev) => ({ ...prev, [id]: "" }));
      toast.success("Onboarding request rejected.");
    } catch (error) {
      toast.error(error.message || "Unable to reject request.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <div className="section-title">Onboarding Approvals</div>
          <div className="section-subtitle">
            Review user identity details, CNIC images, and contact information
            before approving platform access.
          </div>
        </div>
        <div className="admin-summary-pill">
          <ShieldCheck size={18} />
          {pendingCount} Pending Review
        </div>
      </div>

      {loading ? (
        <div className="card p-4">Loading onboarding requests...</div>
      ) : (
        <div className="d-grid gap-3">
          {requests.length === 0 && (
            <div className="card p-4">
              No onboarding requests have been submitted yet.
            </div>
          )}

          {pagedRequests.map((request) => (
            <article className="card onboarding-review-card" key={request.id}>
              <div className="onboarding-review-header">
                <div>
                  <div className="onboarding-review-title">{request.user_email}</div>
                  <div className="text-muted">
                    {statusLabel(request.role)} profile submitted for verification
                  </div>
                </div>
                <span className={`badge-pill status-${request.status}`}>
                  {statusLabel(request.status)}
                </span>
              </div>

              <div className="onboarding-review-grid">
                <Detail label="CNIC number" value={request.cnic_number} />
                <Detail label="Date of birth" value={request.date_of_birth} />
                <Detail label="Gender" value={statusLabel(request.gender)} />
                <Detail label="Occupation" value={request.occupation} />
                <Detail label="Current address" value={request.current_address} />
                <Detail
                  label="Emergency contact"
                  value={[request.emergency_contact_name, request.emergency_contact_phone]
                    .filter(Boolean)
                    .join(" - ")}
                />
              </div>

              <div className="onboarding-documents">
                <a href={request.cnic_front_image} target="_blank" rel="noreferrer">
                  <FileText size={17} />
                  View CNIC front
                  <ExternalLink size={14} />
                </a>
                <a href={request.cnic_back_image} target="_blank" rel="noreferrer">
                  <FileText size={17} />
                  View CNIC back
                  <ExternalLink size={14} />
                </a>
              </div>

              {request.rejection_reason && (
                <div className="onboarding-rejection-note">
                  Rejection reason: {request.rejection_reason}
                </div>
              )}

              {request.status === "pending_review" && (
                <div className="onboarding-review-actions">
                  <input
                    className="form-control"
                    value={rejectReason[request.id] || ""}
                    onChange={(event) =>
                      setRejectReason((prev) => ({
                        ...prev,
                        [request.id]: event.target.value
                      }))
                    }
                    placeholder="Reason required only when rejecting"
                  />
                  <button
                    className="btn btn-light border"
                    type="button"
                    onClick={() => handleReject(request.id)}
                    disabled={Boolean(actionLoading[request.id])}
                  >
                    {actionLoading[request.id] === "reject" ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" />
                        Rejecting...
                      </>
                    ) : (
                      <>
                        <XCircle size={16} />
                        Reject
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-primary-soft"
                    type="button"
                    onClick={() => handleApprove(request.id)}
                    disabled={Boolean(actionLoading[request.id])}
                  >
                    {actionLoading[request.id] === "approve" ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        Approve
                      </>
                    )}
                  </button>
                </div>
              )}
            </article>
          ))}

          {requests.length > 0 && (
            <DataPagination
              itemLabel="requests"
              page={page}
              pageSize={pageSize}
              pageSizeOptions={[5, 10, 20, 50]}
              totalItems={requests.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </div>
      )}
    </div>
  );
}
