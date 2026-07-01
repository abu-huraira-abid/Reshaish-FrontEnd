import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  Flame,
  Home,
  Receipt,
  Wifi,
  Zap,
  Droplet
} from "lucide-react";
import { formatCurrency } from "../../../utils/helpers.js";
import Loading from "../../../components/common/Loading.jsx";
import { apiClient, unwrapData } from "../../../services/api/client.js";

const fallbackPropertyImage =
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop";

const today = new Date();
const currentMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
const nextBillDate = new Date(
  today.getFullYear(),
  today.getDate() > 1 ? today.getMonth() + 1 : today.getMonth(),
  1
);
const formatDisplayDate = (date) =>
  date.toLocaleDateString("en-PK", {
    month: "numeric",
    day: "numeric",
    year: "numeric"
  });
const formatPeriod = (date) =>
  date.toLocaleDateString("en-PK", {
    month: "long",
    year: "numeric"
  });

const utilityBills = [
  {
    id: "b-1",
    type: "Electricity",
    icon: Zap,
    amount: 1850,
    dueDate: formatDisplayDate(nextBillDate),
    status: "pending",
    units: 245,
    previousReading: 12450,
    currentReading: 12695,
    billPeriod: formatPeriod(currentMonthDate)
  },
  {
    id: "b-2",
    type: "Water",
    icon: Droplet,
    amount: 450,
    dueDate: formatDisplayDate(nextBillDate),
    status: "pending",
    units: 15,
    previousReading: 380,
    currentReading: 395,
    billPeriod: formatPeriod(currentMonthDate)
  },
  {
    id: "b-3",
    type: "Gas",
    icon: Flame,
    amount: 620,
    dueDate: formatDisplayDate(nextBillDate),
    status: "pending",
    units: 28,
    previousReading: 2140,
    currentReading: 2168,
    billPeriod: formatPeriod(currentMonthDate)
  },
  {
    id: "b-4",
    type: "Internet",
    icon: Wifi,
    amount: 999,
    dueDate: formatDisplayDate(nextBillDate),
    status: "paid",
    plan: "Fiber 100 Mbps",
    billPeriod: formatPeriod(currentMonthDate),
    paidOn: formatDisplayDate(currentMonthDate)
  },
  {
    id: "b-5",
    type: "Other Bill",
    icon: Receipt,
    amount: 500,
    dueDate: formatDisplayDate(nextBillDate),
    status: "pending",
    plan: "Monthly platform and maintenance charges",
    billPeriod: formatPeriod(currentMonthDate)
  }
];

const statusConfig = {
  due: { label: "Due", className: "status-pill due", icon: AlertCircle },
  pending: { label: "Pending", className: "status-pill pending", icon: Clock },
  paid: { label: "Paid", className: "status-pill paid", icon: CheckCircle2 }
};

export default function RentAndBills() {
  const [tenancies, setTenancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeTenancy = useMemo(
    () =>
      tenancies.find((item) => ["active", "notice_given"].includes(item.status)) ||
      null,
    [tenancies]
  );
  const rentPayment = useMemo(
    () => ({
      month: formatPeriod(currentMonthDate),
      amount: Number(activeTenancy?.rent_amount || 0),
      dueDate: nextBillDate,
      status: activeTenancy ? "due" : "paid"
    }),
    [activeTenancy]
  );

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/rental-tenancies/")
      .then(unwrapData)
      .then(setTenancies)
      .finally(() => setLoading(false));
  }, []);

  const utilityTotal = utilityBills
    .filter((bill) => bill.status === "pending")
    .reduce((sum, bill) => sum + bill.amount, 0);
  const totalDue = rentPayment.amount + utilityTotal;
  const daysUntilDue = Math.max(
    0,
    Math.ceil((nextBillDate - today) / (1000 * 60 * 60 * 24))
  );
  const daysRemaining =
    daysUntilDue === 0 ? "Due today" : `${daysUntilDue} day${daysUntilDue === 1 ? "" : "s"}`;

  const renderStatus = (status) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={`${config.className} d-inline-flex align-items-center gap-1`}>
        <Icon size={12} />
        {config.label}
      </span>
    );
  };

  if (loading) {
    return <Loading label="Loading rent and bills" />;
  }

  if (!activeTenancy) {
    return (
      <div>
        <div className="mb-4">
          <div className="section-title">Rent & Bills</div>
          <div className="section-subtitle">Manage your monthly rent and utility payments</div>
        </div>
        <div className="card p-4 text-muted">
          No active rented property found. Once your payment and key handover are complete,
          your monthly rent and bills will appear here.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Rent & Bills</div>
        <div className="section-subtitle">Manage your monthly rent and utility payments</div>
      </div>

      <div className="card p-4 mb-4">
        <div className="d-flex align-items-center gap-3">
          <img
            src={activeTenancy.property_image || fallbackPropertyImage}
            alt={activeTenancy.property_title}
            className="rounded-4"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <div className="fw-semibold">{activeTenancy.property_title}</div>
            <div className="text-muted small">
              {activeTenancy.property_address}, {activeTenancy.property_city}
            </div>
          </div>
          <div className="text-end">
            <div className="text-muted small">Monthly Rent</div>
            <div className="fw-semibold">{formatCurrency(activeTenancy.rent_amount)}</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="d-grid gap-3">
            <div className="card due-card text-white">
              <div className="d-flex align-items-center gap-2 mb-2">
                <AlertCircle size={16} />
                <span className="small">Total Amount Due</span>
              </div>
              <div className="fs-3 fw-semibold mb-3">{formatCurrency(totalDue)}</div>
              <button className="btn btn-light text-danger fw-semibold">Pay All Now</button>
            </div>

            <div className="card p-3">
              <div className="fw-semibold mb-2">Payment Summary</div>
              <div className="d-flex justify-content-between text-muted small">
                <span>Rent Due</span>
                <span>{formatCurrency(rentPayment.amount)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>Utility & Other Bills</span>
                <span>{formatCurrency(utilityTotal)}</span>
              </div>
              <div className="d-flex justify-content-between fw-semibold mt-2">
                <span>Total</span>
                <span className="text-danger">{formatCurrency(totalDue)}</span>
              </div>
            </div>

            <div className="card p-3 auto-pay-card">
              <div className="d-flex gap-3">
                <div className="auto-pay-icon">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="fw-semibold">Enable Auto-pay</div>
                  <div className="text-muted small">Never miss a payment. Set up automatic rent payments.</div>
                  <button className="btn btn-link p-0 mt-2">Set Up Auto-pay &rarr;</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="d-grid gap-3">
            <div className="card overflow-hidden">
              <div className="rent-header p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="rent-icon" style={{ background: "#ffffff" }}>
                      <Home size={18} />
                    </div>
                    <div>
                      <div className="fw-semibold">Monthly Rent</div>
                      <div className="text-muted small">Payable from the 1st of every month</div>
                    </div>
                  </div>
                  {renderStatus(rentPayment.status)}
                </div>
              </div>
              <div className="p-4">
                <div className="row g-3 mt-1">
                  <div className="col-md-6">
                    <div className="text-muted small">Payment Period</div>
                    <div className="fw-semibold">{rentPayment.month}</div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-muted small">Due Date</div>
                    <div className="fw-semibold">{formatDisplayDate(rentPayment.dueDate)}</div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-muted small">Amount</div>
                    <div className="fw-semibold text-danger">{formatCurrency(rentPayment.amount)}</div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-muted small">Days Remaining</div>
                    <div className="fw-semibold">{daysRemaining}</div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-primary-soft ">
                    <CreditCard size={16} className="me-2" />
                    Pay Rent Now
                  </button>
                  <button className="btn btn-light border">
                    <Calendar size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="utility-header p-4">
                <div className="fw-semibold">Utility Bills</div>
                <div className="text-muted small">Utility bills plus fixed PKR 500 other bill, payable from the 1st of every month</div>
              </div>
              <div className="p-4 d-grid gap-3">
                {utilityBills.map((bill) => {
                  const Icon = bill.icon;
                  return (
                    <div className="card utility-card" key={bill.id}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex gap-3 align-items-center">
                          <div className="utility-icon">
                            <Icon size={16} />
                          </div>
                          <div>
                            <div className="fw-semibold">{bill.type}</div>
                            <div className="text-muted small">Bill Period: {bill.billPeriod}</div>
                          </div>
                        </div>
                        {renderStatus(bill.status)}
                      </div>
                      <div className="row g-3">
                        {bill.units !== undefined && (
                          <>
                            <div className="col-md-3">
                              <div className="text-muted small">Previous Reading</div>
                              <div className="fw-semibold">{bill.previousReading}</div>
                            </div>
                            <div className="col-md-3">
                              <div className="text-muted small">Current Reading</div>
                              <div className="fw-semibold">{bill.currentReading}</div>
                            </div>
                            <div className="col-md-3">
                              <div className="text-muted small">Units Used</div>
                              <div className="fw-semibold">{bill.units}</div>
                            </div>
                          </>
                        )}
                        {bill.plan && (
                          <div className="col-md-9">
                            <div className="text-muted small">Plan</div>
                            <div className="fw-semibold">{bill.plan}</div>
                          </div>
                        )}
                        <div className="col-md-3">
                          <div className="text-muted small">Amount</div>
                          <div className="fw-semibold text-danger">{formatCurrency(bill.amount)}</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="text-muted small d-flex align-items-center gap-2">
                          {bill.status === "paid" ? (
                            <>
                              <CheckCircle2 size={14} className="text-success" />
                              Paid on {bill.paidOn}
                            </>
                          ) : (
                            <>
                              <Calendar size={14} />
                              Due: {bill.dueDate}
                            </>
                          )}
                        </div>
                        <div className="d-flex gap-2">
                          <button className="btn btn-light border btn-sm">
                            <Download size={14} className="me-1" /> Bill
                          </button>
                          {bill.status === "pending" ? (
                            <button className="btn btn-primary-soft btn-sm">Pay Now</button>
                          ) : (
                            <button className="btn btn-light border btn-sm text-success">
                              <Receipt size={14} className="me-1" /> Receipt
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card reminder-card">
              <div className="fw-semibold d-flex align-items-center gap-2">
                <AlertCircle size={16} /> Payment Reminder
              </div>
              <div className="text-muted small">
                Your rent payment is due in {daysRemaining}. Late payments may incur additional charges.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
