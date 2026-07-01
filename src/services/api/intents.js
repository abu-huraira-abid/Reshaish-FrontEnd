import { apiClient, unwrapData } from "./client.js";

function mapIntent(item = {}) {
  const terms = item.terms || {};
  const tenant = item.tenant_detail || item.tenant || {};
  const property = item.property_detail || item.property || {};
  const rent = Number(terms.rent || property.rent || 0);
  const deposit = Number(terms.deposit || property.deposit || 0);

  return {
    ...item,
    id: item.id,
    listingId: property.id || item.property || terms.property_id,
    property:
      property.title ||
      item.property_title ||
      terms.property_title ||
      `Property #${item.property || property.id || ""}`,
    location:
      property.address ||
      item.property_address ||
      [property.city, terms.city].filter(Boolean).join(", "),
    rawStatus: item.status,
    status:
      item.status === "pending_acceptance"
        ? "pending"
        : item.status === "payment_pending"
          ? "accepted"
          : item.status === "cancelled"
            ? "rejected"
            : String(item.status || "pending"),
    tenant: {
      name:
        tenant.name ||
        tenant.email ||
        item.tenant_email ||
        terms.tenant_name ||
        `Tenant #${item.tenant || ""}`,
      phone: tenant.phone || terms.tenant_phone || "Provided in onboarding",
      email: tenant.email || item.tenant_email || "Provided in onboarding",
      occupation: terms.occupation || "Provided in onboarding",
      income: terms.income || "Provided in onboarding"
    },
    lease: {
      moveIn: terms.move_in || terms.moveIn || "To be confirmed",
      duration: terms.duration || terms.lease_duration || "12 months",
      submittedOn: item.created_at?.slice?.(0, 10) || "Recently",
      emergencyContact: "Provided in onboarding",
      emergencyPhone: "Provided in onboarding"
    },
    notes: terms.notes || "No additional notes.",
    payment: {
      deposit,
      rent,
      total: deposit + rent + Number(terms.agreement_charges || 2500)
    }
  };
}

export async function fetchIntents() {
  return unwrapData(await apiClient.get("/agreements/")).map(mapIntent);
}

export async function submitIntent(payload) {
  const { data } = await apiClient.post("/agreements/", {
    property: payload.listingId || payload.property,
    terms: payload.terms || {},
    status: "pending_acceptance"
  });
  return mapIntent(data);
}

export async function updateIntentStatus(id, status) {
  const nextStatus =
    status === "accepted"
      ? "payment_pending"
      : status === "rejected"
        ? "cancelled"
        : String(status).toLowerCase();
  const { data } = await apiClient.patch(`/agreements/${id}/`, {
    status: nextStatus
  });
  return mapIntent(data);
}
