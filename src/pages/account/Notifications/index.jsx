import React, { useEffect, useMemo, useState } from "react";
import { Bell, CheckCheck, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import DataPagination from "../../../components/common/DataPagination.jsx";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead
} from "../../../services/api/notifications.js";

const eventLabel = (value) =>
  String(value || "")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("en-PK", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(value))
    : "";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchNotifications()
      .then(setNotifications)
      .catch((error) => toast.error(error.message || "Unable to load notifications."))
      .finally(() => setLoading(false));
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read_at).length,
    [notifications]
  );
  const pagedNotifications = useMemo(
    () => notifications.slice((page - 1) * pageSize, page * pageSize),
    [notifications, page, pageSize]
  );

  const updateNotification = (updated) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleMarkRead = async (id) => {
    try {
      updateNotification(await markNotificationRead(id));
    } catch (error) {
      toast.error(error.message || "Unable to mark notification as read.");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          read_at: item.read_at || new Date().toISOString()
        }))
      );
      toast.success("Notifications marked as read.");
    } catch (error) {
      toast.error(error.message || "Unable to mark notifications as read.");
    }
  };

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <div className="section-title">Notifications</div>
          <div className="section-subtitle">
            Track verification visits, QR confirmations, and property status updates.
          </div>
        </div>
        <button
          className="btn btn-light border notification-mark-all"
          disabled={!unreadCount}
          onClick={handleMarkAllRead}
          type="button"
        >
          <CheckCheck size={16} />
          Mark all read
        </button>
      </div>

      {loading ? (
        <div className="card p-4">Loading notifications...</div>
      ) : (
        <div className="d-grid gap-3">
          {notifications.length === 0 && (
            <div className="card p-4">No notifications yet.</div>
          )}

          {pagedNotifications.map((item) => (
            <article
              className={`card notification-card ${item.read_at ? "" : "unread"}`}
              key={item.id}
            >
              <div className="notification-icon">
                <Bell size={18} />
              </div>
              <div className="notification-body">
                <div className="notification-title-row">
                  <div>
                    <div className="notification-title">{item.title}</div>
                    <div className="notification-type">{eventLabel(item.event_type)}</div>
                  </div>
                  {!item.read_at && <span className="badge-pill badge-danger">New</span>}
                </div>
                <p>{item.message}</p>
                <div className="notification-meta">
                  <span>
                    <Clock size={14} />
                    {formatDate(item.created_at)}
                  </span>
                  {item.url && (
                    <Link to={item.url}>
                      Open
                      <ExternalLink size={14} />
                    </Link>
                  )}
                </div>
              </div>
              {!item.read_at && (
                <button
                  className="btn btn-light border notification-read-btn"
                  onClick={() => handleMarkRead(item.id)}
                  type="button"
                >
                  Mark read
                </button>
              )}
            </article>
          ))}

          {notifications.length > 0 && (
            <DataPagination
              itemLabel="notifications"
              page={page}
              pageSize={pageSize}
              pageSizeOptions={[5, 10, 20, 50]}
              totalItems={notifications.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </div>
      )}
    </div>
  );
}
