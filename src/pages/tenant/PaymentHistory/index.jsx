import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Download,
  Droplet,
  Eye,
  Flame,
  Home,
  Receipt,
  Search,
  TrendingUp,
  Wifi,
  Zap
} from "lucide-react";
import { fetchPayments, fetchPaymentSummary } from "../../../services/mock/payments.js";
import { formatCurrency } from "../../../utils/helpers.js";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({ total: 0, rentTotal: 0, billTotal: 0 });
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPayments().then(setPayments);
    fetchPaymentSummary().then(setSummary);
  }, []);

  const filtered = payments.filter((item) => {
    const matchQuery = `${item.id} ${item.description} ${item.receipt}`.toLowerCase().includes(query.toLowerCase());
    const matchFilter = filter === "All" || item.type === filter;
    return matchQuery && matchFilter;
  });

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paged = filtered.slice(startIndex, startIndex + pageSize);
  const showingStart = filtered.length ? startIndex + 1 : 0;
  const showingEnd = Math.min(startIndex + pageSize, filtered.length);

  const getIcon = (item) => {
    const label = item.description.toLowerCase();
    if (label.includes("electric")) return Zap;
    if (label.includes("water")) return Droplet;
    if (label.includes("gas")) return Flame;
    if (label.includes("internet")) return Wifi;
    return Home;
  };

  const handleViewReceipt = (item) => {
    setSelected(item);
  };

  const handleDownload = (item) => {
    window.alert(`Downloading receipt ${item.receipt}`);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Payment History</div>
        <div className="section-subtitle">View all your rent and bill payment records</div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card summary-card">
            <div className="summary-top">
              <div className="summary-icon" style={{ background: "#dcfce7" }}>
                <CheckCircle2 size={18} className="text-success" />
              </div>
              <TrendingUp size={14} className="summary-trend" />
            </div>
            <div className="summary-value">{formatCurrency(summary.total)}</div>
            <div className="text-muted small">Total Paid</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card summary-card">
            <div className="summary-top">
              <div className="summary-icon" style={{ background: "#dbeafe" }}>
                <Home size={18} className="text-primary" />
              </div>
            </div>
            <div className="summary-value">{formatCurrency(summary.rentTotal)}</div>
            <div className="text-muted small">Rent Paid</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card summary-card">
            <div className="summary-top">
              <div className="summary-icon" style={{ background: "#f3e8ff" }}>
                <Zap size={18} style={{ color: "#7c3aed" }} />
              </div>
            </div>
            <div className="summary-value">{formatCurrency(summary.billTotal)}</div>
            <div className="text-muted small">Bills Paid</div>
          </div>
        </div>
      </div>

      <div className="card payment-filters d-flex flex-row align-items-center flex-wrap">
        <div className="payment-search input-group">
          <span className="input-group-text auth-input-icon">
            <Search size={16} />
          </span>
          <input
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by transaction ID or description..."
          />
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="payment-pill-group">
            {["All", "Rent", "Bills"].map((item) => (
              <button
                key={item}
                className={`payment-pill ${filter === item ? "active" : ""}`}
                onClick={() => {
                  setFilter(item);
                  setPage(1);
                }}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <button className="btn btn-light border payment-export" type="button">
            <Download size={16} className="me-2" />
            Export
          </button>
        </div>
      </div>

      <div className="card payment-table mt-3">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((item) => {
              const Icon = getIcon(item);
              return (
              <tr key={item.id}>
                <td>
                  <div className="fw-semibold">{item.id}</div>
                  <div className="text-muted small">Receipt: {item.receipt}</div>
                </td>
                <td>
                  <div className="payment-desc">
                    <div className="desc-icon">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="fw-semibold">{item.description}</div>
                      {item.units && <div className="text-muted small">{item.units} units</div>}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-muted small d-flex align-items-center gap-2">
                    <Calendar size={14} />
                    {new Date(item.date).toLocaleDateString("en-US")}
                  </div>
                </td>
                <td className="text-danger fw-semibold">{formatCurrency(item.amount)}</td>
                <td>
                  <span className="method-pill">{item.method}</span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="icon-btn" onClick={() => handleViewReceipt(item)}>
                      <Eye size={16} />
                    </button>
                    <button className="icon-btn" onClick={() => handleDownload(item)}>
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted small">
          Showing {showingStart}-{showingEnd} of {filtered.length} transactions
        </div>
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${safePage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage((p) => Math.max(1, p - 1))}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <li key={pageNum} className={`page-item ${safePage === pageNum ? "active" : ""}`}>
                <button className="page-link" onClick={() => setPage(pageNum)}>
                  {pageNum}
                </button>
              </li>
            ))}
            <li className={`page-item ${safePage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {selected && (
        <div className="modal-backdrop-custom">
          <div className="receipt-modal">
            <div className="receipt-header">
              <div className="d-flex align-items-center gap-3">
                <div className="receipt-icon">
                  <Receipt size={20} className="text-danger" />
                </div>
                <div>
                  <div className="fw-semibold">Payment Receipt</div>
                  <div className="text-muted small">{selected.receipt}</div>
                </div>
              </div>
              <button className="btn btn-sm btn-light" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
            <div className="receipt-body">
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="text-muted small">Transaction ID</div>
                  <div className="fw-semibold">{selected.id}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted small">Payment Date</div>
                  <div className="fw-semibold">{new Date(selected.date).toLocaleDateString("en-US")}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted small">Payment Method</div>
                  <div className="fw-semibold">{selected.method}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted small">Status</div>
                  <span className="badge-pill badge-verified d-inline-flex align-items-center gap-1">
                    <CheckCircle2 size={14} />
                    Completed
                  </span>
                </div>
              </div>

              <div className="border-top pt-3 mb-4">
                <div className="fw-semibold mb-2">Payment Details</div>
                <div className="d-flex justify-content-between text-muted small">
                  <span>{selected.description}</span>
                  <span className="fw-semibold text-dark">{formatCurrency(selected.amount)}</span>
                </div>
                {selected.units && (
                  <div className="d-flex justify-content-between text-muted small mt-2">
                    <span>Units Consumed</span>
                    <span className="fw-semibold text-dark">{selected.units}</span>
                  </div>
                )}
              </div>

              <div className="receipt-total mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Total Amount Paid</span>
                  <span className="fw-semibold text-danger">{formatCurrency(selected.amount)}</span>
                </div>
              </div>

              <div className="receipt-success mb-4">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <CheckCircle2 size={16} className="text-success" />
                  <span className="fw-semibold">Payment Successful</span>
                </div>
                <div className="text-muted small">
                  This is a computer-generated receipt and does not require a signature.
                </div>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button className="btn btn-primary-soft" onClick={() => handleDownload(selected)}>
                  <Download size={16} className="me-2" />
                  Download PDF
                </button>
                <button className="btn btn-light" onClick={() => setSelected(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
