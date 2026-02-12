import React from "react";
import { Download } from "lucide-react";
import { formatCurrency } from "../../../utils/helpers.js";

const payments = [
  { month: "December 2024", amount: 35000, date: "2024-12-03", receipt: "REC-2024-12" },
  { month: "November 2024", amount: 35000, date: "2024-11-04", receipt: "REC-2024-11" },
  { month: "October 2024", amount: 35000, date: "2024-10-05", receipt: "REC-2024-10" }
];

export default function RentHistory() {
  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Rent Payment History</div>
        <div className="section-subtitle">View all rent payment records.</div>
      </div>

      <div className="card p-0">
        <table className="table mb-0">
          <thead className="bg-light">
            <tr>
              <th>Month</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Receipt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.receipt}>
                <td>{payment.month}</td>
                <td>{formatCurrency(payment.amount)}</td>
                <td>{new Date(payment.date).toLocaleDateString("en-PK")}</td>
                <td>{payment.receipt}</td>
                <td>
                  <button className="btn btn-link text-danger p-0">
                    <Download size={14} className="me-1" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
