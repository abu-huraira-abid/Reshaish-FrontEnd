import React from "react";
import { AlertCircle } from "lucide-react";
import PropertyBanner from "./components/PropertyBanner.jsx";
import DueSummaryCard from "./components/DueSummaryCard.jsx";
import PaymentSummaryCard from "./components/PaymentSummaryCard.jsx";
import AutoPayCard from "./components/AutoPayCard.jsx";
import MonthlyRentCard from "./components/MonthlyRentCard.jsx";
import UtilityBillCard from "./components/UtilityBillCard.jsx";

const bills = [
  {
    id: "b-1",
    name: "Electricity",
    period: "Dec 2024",
    previous: 12450,
    current: 12695,
    units: 245,
    amount: 1850,
    due: "1/9/2025",
    status: "Pending"
  },
  {
    id: "b-2",
    name: "Water",
    period: "Dec 2024",
    previous: 380,
    current: 395,
    units: 15,
    amount: 450,
    due: "1/7/2025",
    status: "Pending"
  },
  {
    id: "b-3",
    name: "Gas",
    period: "Dec 2024",
    previous: 2140,
    current: 2168,
    units: 28,
    amount: 620,
    due: "1/11/2025",
    status: "Pending"
  },
  {
    id: "b-4",
    name: "Internet",
    period: "Dec 2024",
    previous: "Fiber 100 Mbps",
    current: "Paid on 2024-12-28",
    units: "-",
    amount: 999,
    due: "Paid",
    status: "Paid"
  }
];

export default function RentBills() {
  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Rent & Bills</div>
        <div className="section-subtitle">Manage your monthly rent and utility payments</div>
      </div>
      <PropertyBanner />
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="d-grid gap-3">
            <DueSummaryCard />
            <PaymentSummaryCard />
            <AutoPayCard />
          </div>
        </div>
        <div className="col-lg-8">
          <div className="d-grid gap-3">
            <MonthlyRentCard />
            <div className="card utility-section">
              <div className="fw-semibold mb-1">Utility Bills</div>
              <div className="text-muted small mb-3">Pay your monthly utility bills</div>
              <div className="d-grid gap-3">
                {bills.map((bill) => (
                  <UtilityBillCard key={bill.id} bill={bill} />
                ))}
              </div>
            </div>
            <div className="card reminder-card">
              <div className="d-flex align-items-center gap-2 fw-semibold">
                <AlertCircle size={16} />
                Payment Reminder
              </div>
              <div className="text-muted small">
                Your rent payment is due in -354 days. Late payments may incur additional charges.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
