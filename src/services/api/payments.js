import { apiClient, unwrapData } from "./client.js";
import { mapPayment } from "./mappers.js";

export async function fetchPayments() {
  const data = unwrapData(await apiClient.get("/payments/"));
  return data.map(mapPayment);
}

export async function createPayment(payload) {
  const { data } = await apiClient.post("/payments/", {
    agreement: payload.agreementId || payload.agreement || 1,
    amount_breakdown: payload.amount_breakdown || {
      [payload.type || "payment"]: Number(payload.amount || 0)
    },
    gateway_ref: payload.gatewayRef || "sandbox",
    status: payload.fail ? "failed" : "success"
  });
  return mapPayment(data);
}

export async function fetchPaymentSummary() {
  const payments = await fetchPayments();
  const total = payments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const rentTotal = payments
    .filter((payment) => payment.type === "Rent")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return {
    total,
    rentTotal,
    billTotal: total - rentTotal
  };
}
