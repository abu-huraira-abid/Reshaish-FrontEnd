import React from "react";
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

const currentProperty = {
  title: "Luxury 2BHK in Gulberg",
  location: "Gulberg III, Lahore",
  monthlyRent: 25000,
  dueDate: 5,
  image:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop"
};

const rentPayment = {
  month: "January 2025",
  amount: 25000,
  dueDate: "2025-01-05",
  status: "due"
};

const utilityBills = [
  {
    id: "b-1",
    type: "Electricity",
    icon: Zap,
    amount: 1850,
    dueDate: "2025-01-09",
    status: "pending",
    units: 245,
    previousReading: 12450,
    currentReading: 12695,
    billPeriod: "Dec 2024"
  },
  {
    id: "b-2",
    type: "Water",
    icon: Droplet,
    amount: 450,
    dueDate: "2025-01-07",
    status: "pending",
    units: 15,
    previousReading: 380,
    currentReading: 395,
    billPeriod: "Dec 2024"
  },
  {
    id: "b-3",
    type: "Gas",
    icon: Flame,
    amount: 620,
    dueDate: "2025-01-11",
    status: "pending",
    units: 28,
    previousReading: 2140,
    currentReading: 2168,
    billPeriod: "Dec 2024"
  },
  {
    id: "b-4",
    type: "Internet",
    icon: Wifi,
    amount: 999,
    dueDate: "2025-01-01",
    status: "paid",
    plan: "Fiber 100 Mbps",
    billPeriod: "Dec 2024",
    paidOn: "2024-12-28"
  }
];

const statusConfig = {
  due: { label: "Due", className: "status-pill due", icon: AlertCircle },
  pending: { label: "Pending", className: "status-pill pending", icon: Clock },
  paid: { label: "Paid", className: "status-pill paid", icon: CheckCircle2 }
};

export default function RentAndBills() {
  const utilityTotal = utilityBills
    .filter((bill) => bill.status === "pending")
    .reduce((sum, bill) => sum + bill.amount, 0);
  const totalDue = rentPayment.amount + utilityTotal;
  const daysRemaining = "-354 days";

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

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Rent & Bills</div>
        <div className="section-subtitle">Manage your monthly rent and utility payments</div>
      </div>

      <div className="card p-4 mb-4">
        <div className="d-flex align-items-center gap-3">
          <img
            src={currentProperty.image}
            alt={currentProperty.title}
            className="rounded-4"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <div className="fw-semibold">{currentProperty.title}</div>
            <div className="text-muted small">{currentProperty.location}</div>
          </div>
          <div className="text-end">
            <div className="text-muted small">Monthly Rent</div>
            <div className="fw-semibold">{formatCurrency(currentProperty.monthlyRent)}</div>
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
                <span>Utility Bills</span>
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
                      <div className="text-muted small">Due on {currentProperty.dueDate}th of every month</div>
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
                    <div className="fw-semibold">1/5/2025</div>
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
                <div className="text-muted small">Pay your monthly utility bills</div>
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
