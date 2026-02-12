import { mockDelay } from "../api.js";

const transactions = [
  {
    id: "TXN-2024-001245",
    description: "Monthly Rent - December 2024",
    date: "2024-12-02",
    amount: 25000,
    type: "Rent",
    method: "JazzCash",
    receipt: "RCP-2024-1245"
  },
  {
    id: "TXN-2024-001246",
    description: "Electricity Bill - November 2024",
    date: "2024-12-04",
    amount: 1750,
    type: "Bills",
    method: "Card",
    receipt: "RCP-2024-1246",
    units: 235
  },
  {
    id: "TXN-2024-001247",
    description: "Water Bill - November 2024",
    date: "2024-12-04",
    amount: 420,
    type: "Bills",
    method: "Easypaisa",
    receipt: "RCP-2024-1247",
    units: 14
  },
  {
    id: "TXN-2024-001248",
    description: "Internet Bill - December 2024",
    date: "2024-11-30",
    amount: 999,
    type: "Bills",
    method: "JazzCash",
    receipt: "RCP-2024-1248"
  },
  {
    id: "TXN-2024-001242",
    description: "Monthly Rent - November 2024",
    date: "2024-11-03",
    amount: 25000,
    type: "Rent",
    method: "Bank Transfer",
    receipt: "RCP-2024-1242"
  },
  {
    id: "TXN-2024-001243",
    description: "Gas Bill - October 2024",
    date: "2024-11-09",
    amount: 580,
    type: "Bills",
    method: "Card",
    receipt: "RCP-2024-1243",
    units: 26
  }
];

export function fetchPayments() {
  return mockDelay(transactions, 600);
}

export function createPayment(payload) {
  const transaction = {
    id: `TXN-${Date.now()}`,
    status: payload.fail ? "Failed" : "Success",
    date: new Date().toISOString().slice(0, 10),
    ...payload
  };
  transactions.unshift(transaction);
  return mockDelay(transaction, 800);
}

export function fetchPaymentSummary() {
  const total = transactions.reduce((sum, item) => sum + item.amount, 0);
  const rentTotal = transactions.filter((t) => t.type === "Rent").reduce((sum, t) => sum + t.amount, 0);
  const billTotal = total - rentTotal;
  return mockDelay({ total, rentTotal, billTotal }, 400);
}
