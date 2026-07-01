import React, { useEffect, useState } from "react";
import { AlertCircle, Calendar, CheckCircle2, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DataPagination from "../../../components/common/DataPagination.jsx";
import Loading from "../../../components/common/Loading.jsx";
import { fetchVisitRequests, updateVisitStatus } from "../../../services/api/visits.js";

const statusConfig = {
  Scheduled: { label: "Scheduled", icon: CheckCircle2, className: "badge-verified" },
  Requested: { label: "Pending", icon: AlertCircle, className: "badge-pending" },
  Completed: { label: "Completed", icon: CheckCircle2, className: "badge-info" },
  Cancelled: { label: "Cancelled", icon: AlertCircle, className: "badge-danger" },
  NoShow: { label: "No Show", icon: AlertCircle, className: "badge-danger" }
};

export default function Visits() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVisitRequests().then((data) => {
      setVisits(data);
      setLoading(false);
    });
  }, []);

  const pagedVisits = visits.slice((page - 1) * pageSize, page * pageSize);

  const handleCancelRequest = async (visitId) => {
    setCancellingId(visitId);
    try {
      const updatedVisit = await updateVisitStatus(visitId, "Cancelled");
      setVisits((prev) =>
        prev.map((visit) => (visit.id === visitId ? updatedVisit : visit))
      );
      toast.success("Visit request cancelled.");
    } catch (error) {
      toast.error(error.message || "Unable to cancel visit request.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">My Visit Schedule</div>
        <div className="section-subtitle">Track scheduled and completed visits.</div>
      </div>

      {loading ? (
        <Loading label="Loading visits" />
      ) : (
        <>
          <div className="d-grid gap-3">
            {pagedVisits.map((visit) => {
              const status = statusConfig[visit.status] || statusConfig.Requested;
              const StatusIcon = status.icon;
              const visitDate = visit.date ? new Date(visit.date) : null;
              return (
                <div className="card p-3" key={visit.id}>
                  <div className="d-flex flex-wrap gap-3">
                    <img
                      src={visit.image}
                      alt={visit.property}
                      style={{ width: "140px", height: "120px", objectFit: "cover" }}
                      className="rounded-4"
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-start justify-content-between gap-2">
                        <div>
                          <h6 className="fw-semibold mb-1">{visit.property}</h6>
                          <div className="text-muted small d-flex align-items-center gap-2">
                            <MapPin size={14} />
                            {visit.location}
                          </div>
                        </div>
                        <span className={`badge-pill ${status.className} d-inline-flex align-items-center gap-1`}>
                          <StatusIcon size={14} />
                          {status.label}
                        </span>
                      </div>

                      <div className="d-flex flex-wrap gap-3 text-muted small mt-3">
                        <span className="d-flex align-items-center gap-1">
                          <Calendar size={14} />
                          {visitDate
                            ? visitDate.toLocaleDateString("en-PK", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })
                            : "Awaiting schedule"}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <Clock size={14} />
                          {visit.time || "Time pending"}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex flex-column gap-2 ms-auto">
                      {visit.status === "Scheduled" && (
                        <>
                          <button className="btn btn-light border">Get Directions</button>
                          <button
                            className="btn btn-primary-soft"
                            onClick={() => navigate("/tenant/qr")}
                          >
                            QR Check-in
                          </button>
                        </>
                      )}
                      {visit.status === "Requested" && (
                        <button
                          className="btn btn-light border"
                          disabled={cancellingId === visit.id}
                          onClick={() => handleCancelRequest(visit.id)}
                          type="button"
                        >
                          {cancellingId === visit.id ? (
                            <>
                              <span className="spinner-border spinner-border-sm" role="status" />
                              Cancelling...
                            </>
                          ) : (
                            "Cancel Request"
                          )}
                        </button>
                      )}
                      {visit.status === "Completed" && (
                        <button
                          className="btn btn-primary-soft"
                          onClick={() => navigate(`/tenant/submit-intent/${visit.listingId}`)}
                        >
                          Submit Rental Intent
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {visits.length > 0 && (
            <DataPagination
              itemLabel="visits"
              page={page}
              pageSize={pageSize}
              pageSizeOptions={[5, 10, 20, 50]}
              totalItems={visits.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </>
      )}
    </div>
  );
}
