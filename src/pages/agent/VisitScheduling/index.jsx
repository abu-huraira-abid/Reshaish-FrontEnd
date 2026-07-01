import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import VisitAssignmentCard from "./components/VisitAssignmentCard.jsx";
import DataPagination from "../../../components/common/DataPagination.jsx";
import {
  fetchAssignedVerifications,
  scheduleVerificationVisit
} from "../../../services/api/agent.js";
import {
  fetchVisitRequests,
  scheduleTenantVisit
} from "../../../services/api/visits.js";

export default function VisitScheduling() {
  const [assignments, setAssignments] = useState([]);
  const [tenantVisits, setTenantVisits] = useState([]);
  const [loadingAction, setLoadingAction] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchAssignedVerifications().then(setAssignments);
    fetchVisitRequests().then((visits) => {
      setTenantVisits(visits.filter((visit) => visit.status === "Requested"));
    });
  }, []);

  const pagedAssignments = assignments.slice((page - 1) * pageSize, page * pageSize);

  const handleSchedule = async (assignment, slot) => {
    setLoadingAction(assignment.id);
    try {
      await scheduleVerificationVisit({
        listingId: assignment.listingId,
        confirmedSlot: new Date(slot).toISOString()
      });
      toast.success("Verification visit scheduled. Landlord has been notified.");
      setAssignments((prev) => prev.filter((item) => item.id !== assignment.id));
    } catch (error) {
      toast.error(error.message || "Unable to schedule verification visit.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleTenantVisitSchedule = async (visit, slot) => {
    setLoadingAction(`tenant-${visit.id}`);
    try {
      await scheduleTenantVisit(visit.id, new Date(slot).toISOString());
      toast.success("Tenant visit scheduled. QR and notifications are ready.");
      setTenantVisits((prev) => prev.filter((item) => item.id !== visit.id));
    } catch (error) {
      toast.error(error.message || "Unable to schedule tenant visit.");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Visit Scheduling</div>
        <div className="section-subtitle">Confirm visit slots and assign yourself.</div>
      </div>
      <div className="section-heading-sm mb-3">Property verification visits</div>
      <div className="d-grid gap-3">
        {pagedAssignments.map((assignment) => (
          <VisitAssignmentCard
            key={assignment.id}
            assignment={assignment}
            loading={loadingAction === assignment.id}
            onSchedule={handleSchedule}
          />
        ))}
      </div>
      <div className="section-heading-sm mt-5 mb-3">Tenant meeting requests</div>
      <div className="d-grid gap-3">
        {tenantVisits.map((visit) => (
          <VisitAssignmentCard
            key={visit.id}
            assignment={{
              ...visit,
              city: visit.location,
              slot: visit.requestedSlots?.[0] || "Tenant requested a visit",
              status: "Tenant Request"
            }}
            loading={loadingAction === `tenant-${visit.id}`}
            onSchedule={handleTenantVisitSchedule}
          />
        ))}
        {!tenantVisits.length && (
          <div className="card p-4 text-muted">No tenant meeting requests right now.</div>
        )}
      </div>
      {assignments.length > 0 && (
        <DataPagination
          itemLabel="assignments"
          page={page}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 20, 50]}
          totalItems={assignments.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
}
