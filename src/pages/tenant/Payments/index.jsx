import React, { useEffect, useState } from "react";
import { CheckCircle2, Home, TrendingUp, Zap } from "lucide-react";
import SummaryCard from "./components/SummaryCard.jsx";
import PaymentFilters from "./components/PaymentFilters.jsx";
import PaymentTable from "./components/PaymentTable.jsx";
import DataPagination from "../../../components/common/DataPagination.jsx";
import { fetchPayments, fetchPaymentSummary } from "../../../services/api/payments.js";
import { formatCurrency } from "../../../utils/helpers.js";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({ total: 0, rentTotal: 0, billTotal: 0 });
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchPayments().then(setPayments);
    fetchPaymentSummary().then(setSummary);
  }, []);

  const filtered = payments.filter((item) => {
    const matchQuery = `${item.id} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    const matchFilter = activeFilter === "All" || item.type === activeFilter;
    return matchQuery && matchFilter;
  });
  const pagedPayments = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleQueryChange = (value) => {
    setQuery(value);
    setPage(1);
  };

  const handleFilterChange = (value) => {
    setActiveFilter(value);
    setPage(1);
  };

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
        onQueryChange={handleQueryChange}
        active={activeFilter}
        onFilterChange={handleFilterChange}
      />
      <div className="mt-3">
        <PaymentTable items={pagedPayments} />
      </div>
      {filtered.length > 0 && (
        <DataPagination
          itemLabel="transactions"
          page={page}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 20, 50]}
          totalItems={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
}
