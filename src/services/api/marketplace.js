import { apiClient, unwrapData } from "./client.js";
import { mapServiceOrder } from "./mappers.js";

export async function fetchServiceCategories() {
  const orders = await fetchServiceOrders();
  const counts = orders.reduce((acc, order) => {
    acc[order.service_type] = (acc[order.service_type] || 0) + 1;
    return acc;
  }, {});

  return [
    { id: "all", label: "All Services", count: orders.length },
    { id: "moving", label: "Moving & Packing", count: counts.moving || 0 },
    { id: "internet", label: "Internet & Cable", count: counts.internet || 0 },
    { id: "maintenance", label: "Home Maintenance", count: counts.maintenance || 0 },
    { id: "transport", label: "Transport", count: counts.transport || 0 },
    { id: "other", label: "Other", count: counts.other || 0 }
  ];
}

export async function fetchServices() {
  return [
    {
      id: "moving",
      category: "moving",
      title: "Moving & Packing Service",
      vendor: "Rehaish Partner",
      description: "Book verified moving and packing support.",
      price: 3500,
      verified: true
    },
    {
      id: "internet",
      category: "internet",
      title: "Internet Setup",
      vendor: "Rehaish Partner",
      description: "Schedule internet installation for a rented property.",
      price: 999,
      verified: true
    },
    {
      id: "maintenance",
      category: "maintenance",
      title: "Home Maintenance",
      vendor: "Rehaish Partner",
      description: "Request maintenance services for common home needs.",
      price: 499,
      verified: true
    }
  ];
}

export async function fetchServiceById(id) {
  const services = await fetchServices();
  return services.find((service) => service.id === id);
}

export async function createServiceOrder(payload) {
  const { data } = await apiClient.post("/service-orders/", {
    property: payload.property || null,
    service_type: payload.serviceType,
    vendor_name: payload.vendorName || "",
    schedule: payload.schedule,
    amount: Number(payload.amount || 0),
    status: payload.status || "requested",
    notes: payload.notes || ""
  });
  return mapServiceOrder(data);
}

export async function fetchServiceOrders() {
  const data = unwrapData(await apiClient.get("/service-orders/"));
  return data.map(mapServiceOrder);
}

export async function fetchServiceOrderById(id) {
  const { data } = await apiClient.get(`/service-orders/${id}/`);
  return mapServiceOrder(data);
}
