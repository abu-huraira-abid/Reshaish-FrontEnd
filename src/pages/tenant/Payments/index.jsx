import React, { useEffect, useState } from "react";
import { CheckCircle2, Home, TrendingUp, Zap } from "lucide-react";
import SummaryCard from "./components/SummaryCard.jsx";
import PaymentFilters from "./components/PaymentFilters.jsx";
import PaymentTable from "./components/PaymentTable.jsx";
import { fetchPayments, fetchPaymentSummary } from "../../../services/mock/payments.js";
import { formatCurrency } from "../../../utils/helpers.js";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({ total: 0, rentTotal: 0, billTotal: 0 });
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetchPayments().then(setPayments);
    fetchPaymentSummary().then(setSummary);
  }, []);

  const filtered = payments.filter((item) => {
    const matchQuery = `${item.id} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    const matchFilter = activeFilter === "All" || item.type === activeFilter;
    return matchQuery && matchFilter;
  });

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Payment History</div>
        <div className="section-subtitle">View all your rent and bill payment records</div>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <SummaryCard
            label="Total Paid"
            value={formatCurrency(summary.total)}
            icon={<CheckCircle2 size={18} />}
            tone="#dcfce7"
            trend={<TrendingUp size={16} />}
          />
        </div>
        <div className="col-md-4">
          <SummaryCard
            label="Rent Paid"
            value={formatCurrency(summary.rentTotal)}
            icon={<Home size={18} />}
            tone="#dbeafe"
          />
        </div>
        <div className="col-md-4">
          <SummaryCard
            label="Bills Paid"
            value={formatCurrency(summary.billTotal)}
            icon={<Zap size={18} />}
            tone="#f3e8ff"
          />
        </div>
      </div>
      <PaymentFilters
        query={query}
        onQueryChange={setQuery}
        active={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <div className="mt-3">
        <PaymentTable items={filtered} />
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted small">Showing 1-{filtered.length} of {filtered.length} transactions</div>
        <div className="d-flex gap-2">
          <button className="btn btn-light border btn-sm">Previous</button>
          <button className="btn btn-primary-soft btn-sm">Next</button>
        </div>
      </div>
    </div>
  );
}
