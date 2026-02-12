import React, { useEffect, useState } from "react";
import { Calendar, CheckCircle2, Clock, Download, MapPin, Package, Phone, Star, XCircle } from "lucide-react";
import { fetchServiceOrders } from "../../../services/mock/marketplace.js";
import Modal from "../../../components/common/Modal.jsx";
import { formatCurrency } from "../../../utils/helpers.js";

const statusMeta = {
  pending: { label: "Pending", icon: Clock, className: "badge-pending" },
  completed: { label: "Completed", icon: CheckCircle2, className: "badge-verified" },
  cancelled: { label: "Cancelled", icon: XCircle, className: "badge-danger" }
};

export default function ServiceOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [ratingModal, setRatingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    fetchServiceOrders().then(setOrders);
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((order) => order.status === filter);

  const openRating = (order) => {
    setSelectedOrder(order);
    setRating(0);
    setReview("");
    setRatingModal(true);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">My Service Orders</div>
        <div className="section-subtitle">Track and manage your service bookings.</div>
      </div>

      <div className="card p-3 mb-3">
        <div className="d-flex gap-2 flex-wrap">
          {["all", "pending", "completed", "cancelled"].map((item) => (
            <button
              key={item}
              className={`payment-pill ${filter === item ? "active" : ""}`}
              type="button"
              onClick={() => setFilter(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="d-grid gap-3">
        {filtered.map((order) => {
          const meta = statusMeta[order.status] || statusMeta.pending;
          const StatusIcon = meta.icon;

          return (
            <div className="card" key={order.id}>
              <div className="p-3 border-bottom bg-light">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={order.image}
                      alt={order.service}
                      className="rounded-4"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                    <div>
                      <div className="fw-semibold">{order.service}</div>
                      <div className="text-muted small">{order.provider} · {order.package}</div>
                      <div className="text-muted small">Order ID: {order.orderId}</div>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className={`badge-pill ${meta.className} d-inline-flex align-items-center gap-1`}>
                      <StatusIcon size={14} />
                      {meta.label}
                    </span>
                    <div className="text-muted small mt-2">{formatCurrency(order.amount)}</div>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="text-muted small mb-1">Scheduled For</div>
                    <div className="d-flex align-items-center gap-2 text-muted small">
                      <Calendar size={14} />
                      {new Date(order.scheduledDate).toLocaleDateString("en-PK")}
                    </div>
                    <div className="d-flex align-items-center gap-2 text-muted small">
                      <Clock size={14} />
                      {order.scheduledTime}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-muted small mb-1">Service Address</div>
                    <div className="d-flex align-items-start gap-2 text-muted small">
                      <MapPin size={14} />
                      {order.address}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-muted small mb-1">Provider Contact</div>
                    <div className="d-flex align-items-center gap-2 text-muted small">
                      <Phone size={14} />
                      {order.contact}
                    </div>
                    {order.assignedAgent && (
                      <div className="text-muted small mt-2">
                        Agent: {order.assignedAgent.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex gap-2 mt-3 flex-wrap">
                  {order.status === "pending" && (
                    <>
                      <button className="btn btn-light border">Contact Provider</button>
                      <button className="btn btn-light border text-danger">Cancel Booking</button>
                    </>
                  )}
                  {order.status === "completed" && !order.rated && (
                    <>
                      <button className="btn btn-primary-soft" onClick={() => openRating(order)}>
                        <Star size={16} className="me-2" />
                        Rate Service
                      </button>
                      <button className="btn btn-light border">
                        <Download size={16} className="me-2" />
                        Invoice
                      </button>
                    </>
                  )}
                  {order.status === "completed" && order.rated && (
                    <>
                      <button className="btn btn-light border">Download Invoice</button>
                      <button className="btn btn-primary-soft">Book Again</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="card p-5 text-center">
            <Package size={32} className="text-muted mb-2" />
            <div className="fw-semibold">No orders found</div>
            <div className="text-muted small">Try another filter or book a service.</div>
          </div>
        )}
      </div>

      <Modal
        open={ratingModal}
        title="Rate Your Experience"
        onClose={() => setRatingModal(false)}
        actions={
          <>
            <button className="btn btn-light" onClick={() => setRatingModal(false)}>Cancel</button>
            <button className="btn btn-primary-soft" onClick={() => setRatingModal(false)}>Submit</button>
          </>
        }
      >
        {selectedOrder && (
          <div>
            <div className="fw-semibold mb-2">{selectedOrder.service}</div>
            <div className="d-flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="btn btn-light border"
                  onClick={() => setRating(star)}
                >
                  <Star size={16} className={star <= rating ? "text-warning" : "text-muted"} />
                </button>
              ))}
            </div>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Share your experience..."
              value={review}
              onChange={(event) => setReview(event.target.value)}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
