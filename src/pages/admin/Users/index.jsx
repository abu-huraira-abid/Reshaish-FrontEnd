import React, { useEffect, useMemo, useState } from "react";
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  UserRound,
  Users
} from "lucide-react";
import toast from "react-hot-toast";
import DataPagination from "../../../components/common/DataPagination.jsx";
import {
  fetchAdminUsers,
  fetchOnboardingRequests,
  reactivateUser,
  suspendUser
} from "../../../services/api/admin.js";

const roleLabel = (value) =>
  String(value || "")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const formatDate = (value) => {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
};

function Detail({ label, value }) {
  return (
    <div>
      <div className="small text-muted">{label}</div>
      <div className="fw-semibold">{value || "Not provided"}</div>
    </div>
  );
}

function UserAvatar({ user }) {
  if (user.profilePhoto) {
    return (
      <div className="admin-user-avatar">
        <img src={user.profilePhoto} alt={user.name} />
      </div>
    );
  }

  return (
    <div className="admin-user-avatar">
      <UserRound size={24} />
    </div>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [onboarding, setOnboarding] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    Promise.all([fetchAdminUsers(), fetchOnboardingRequests()])
      .then(([userData, onboardingData]) => {
        setUsers(userData);
        setOnboarding(onboardingData);
      })
      .catch((error) => toast.error(error.message || "Unable to load users."))
      .finally(() => setLoading(false));
  }, []);

  const onboardingByEmail = useMemo(() => {
    return onboarding.reduce((acc, profile) => {
      if (profile.user_email) acc[profile.user_email.toLowerCase()] = profile;
      return acc;
    }, {});
  }, [onboarding]);

  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((user) => user.is_active).length,
      suspended: users.filter((user) => !user.is_active).length
    }),
    [users]
  );

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return users.filter((user) => {
      const profile = onboardingByEmail[user.email?.toLowerCase?.()] || {};
      const searchable = [
        user.name,
        user.email,
        user.phone,
        user.city,
        user.role,
        profile.cnic_number,
        profile.current_address,
        profile.occupation
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesRole = role === "all" || user.role === role;
      const matchesStatus =
        status === "all" ||
        (status === "active" && user.is_active) ||
        (status === "suspended" && !user.is_active);

      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [onboardingByEmail, query, role, status, users]);

  const pagedUsers = useMemo(
    () => filteredUsers.slice((page - 1) * pageSize, page * pageSize),
    [filteredUsers, page, pageSize]
  );

  const updateUser = (updated) => {
    setUsers((prev) => prev.map((user) => (user.id === updated.id ? updated : user)));
  };

  const handleStatusAction = async (user) => {
    const action = user.is_active ? "suspend" : "reactivate";
    setActionLoading((prev) => ({ ...prev, [user.id]: action }));
    try {
      const updated =
        action === "suspend"
          ? await suspendUser(user.id)
          : await reactivateUser(user.id);
      updateUser(updated);
      toast.success(
        action === "suspend"
          ? "User account suspended."
          : "User account reactivated."
      );
    } catch (error) {
      toast.error(error.message || "Unable to update user status.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [user.id]: null }));
    }
  };

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <div className="section-title">Users</div>
          <div className="section-subtitle">
            View user profiles, onboarding details, and control account access.
          </div>
        </div>
        <div className="admin-summary-pill">
          <Users size={18} />
          {stats.total} Total Users
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card admin-user-stat">
            <Users size={20} />
            <div>
              <strong>{stats.total}</strong>
              <span>Total users</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card admin-user-stat">
            <CheckCircle2 size={20} />
            <div>
              <strong>{stats.active}</strong>
              <span>Active accounts</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card admin-user-stat danger">
            <Ban size={20} />
            <div>
              <strong>{stats.suspended}</strong>
              <span>Suspended accounts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card admin-user-filters mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <Search size={17} />
          </span>
          <input
            className="form-control"
            placeholder="Search by name, email, CNIC, city, or occupation"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          className="form-select"
          value={role}
          onChange={(event) => {
            setRole(event.target.value);
            setPage(1);
          }}
        >
          <option value="all">All roles</option>
          <option value="tenant">Tenant</option>
          <option value="landlord">Landlord</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>

        <select
          className="form-select"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {loading ? (
        <div className="card p-4">Loading users...</div>
      ) : (
        <div className="d-grid gap-3">
          {filteredUsers.length === 0 && (
            <div className="card p-4">No users match your filters.</div>
          )}

          {pagedUsers.map((user) => {
            const profile = onboardingByEmail[user.email?.toLowerCase?.()] || {};
            const loadingAction = actionLoading[user.id];
            return (
              <article className="card admin-user-card" key={user.id}>
                <div className="admin-user-card-header">
                  <div className="admin-user-identity">
                    <UserAvatar user={user} />
                    <div>
                      <div className="admin-user-name">{user.name}</div>
                      <div className="admin-user-meta">
                        <Mail size={15} />
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="admin-user-badges">
                    <span className={`badge-pill ${user.is_active ? "status-approved" : "status-rejected"}`}>
                      {user.is_active ? "Active" : "Suspended"}
                    </span>
                    <span className="badge-soft">{roleLabel(user.role)}</span>
                  </div>
                </div>

                <div className="admin-user-contact-grid">
                  <Detail
                    label="Phone number"
                    value={
                      user.phone ? (
                        <span className="admin-inline-icon">
                          <Phone size={14} />
                          {user.phone}
                        </span>
                      ) : null
                    }
                  />
                  <Detail
                    label="City"
                    value={
                      user.city ? (
                        <span className="admin-inline-icon">
                          <MapPin size={14} />
                          {user.city}
                        </span>
                      ) : null
                    }
                  />
                  <Detail
                    label="Joined"
                    value={
                      <span className="admin-inline-icon">
                        <CalendarDays size={14} />
                        {formatDate(user.date_joined)}
                      </span>
                    }
                  />
                  <Detail
                    label="Email verification"
                    value={
                      <span className="admin-inline-icon">
                        <ShieldCheck size={14} />
                        {user.email_verified ? "Verified" : "Not verified"}
                      </span>
                    }
                  />
                </div>

                <div className="admin-user-profile-panel">
                  <div className="admin-user-profile-title">Onboarding profile</div>
                  {profile.id ? (
                    <div className="onboarding-review-grid">
                      <Detail label="Status" value={roleLabel(profile.status)} />
                      <Detail label="CNIC number" value={profile.cnic_number} />
                      <Detail label="Date of birth" value={profile.date_of_birth} />
                      <Detail label="Gender" value={roleLabel(profile.gender)} />
                      <Detail label="Occupation" value={profile.occupation} />
                      <Detail label="Current address" value={profile.current_address} />
                    </div>
                  ) : (
                    <div className="text-muted">
                      This user has not submitted onboarding details yet.
                    </div>
                  )}
                </div>

                <div className="admin-user-actions">
                  <button
                    className={`btn ${user.is_active ? "btn-light border" : "btn-primary-soft"}`}
                    type="button"
                    onClick={() => handleStatusAction(user)}
                    disabled={Boolean(loadingAction)}
                  >
                    {loadingAction ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" />
                        {loadingAction === "suspend" ? "Suspending..." : "Reactivating..."}
                      </>
                    ) : user.is_active ? (
                      <>
                        <Ban size={16} />
                        Suspend account
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        Reactivate account
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}

          {filteredUsers.length > 0 && (
            <DataPagination
              itemLabel="users"
              page={page}
              pageSize={pageSize}
              pageSizeOptions={[5, 10, 20, 50]}
              totalItems={filteredUsers.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </div>
      )}
    </div>
  );
}
