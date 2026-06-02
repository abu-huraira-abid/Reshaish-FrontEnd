const DEFAULT_LISTING_IMAGE =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop";

const statusLabel = (value) =>
  String(value || "")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export function mapUser(user = {}) {
  return {
    ...user,
    name:
      [user.first_name, user.last_name].filter(Boolean).join(" ") ||
      user.username ||
      user.email
  };
}

export function mapListing(item = {}) {
  const propertyType = item.property_type || item.type || "Apartment";
  return {
    ...item,
    id: item.id,
    title: item.title,
    city: item.city,
    location: item.location || item.address,
    rent: item.rent,
    deposit: item.deposit,
    type: statusLabel(propertyType),
    portion: item.portion || "Full",
    residentialType: item.residentialType || "Residential",
    beds: item.beds || 1,
    baths: item.baths || 1,
    size: item.size || 0,
    status: statusLabel(item.status),
    tag: item.tag || statusLabel(propertyType),
    address: item.address,
    images: item.images?.length ? item.images : [DEFAULT_LISTING_IMAGE],
    description: item.description
  };
}

export function mapVisit(item = {}) {
  const listing = item.property_detail || item.property || {};
  return {
    ...item,
    id: item.id,
    listingId: listing.id || item.property,
    property: listing.title || item.property_name || `Property #${item.property}`,
    location: listing.address || item.location || "",
    date: item.confirmed_slot?.slice?.(0, 10) || "",
    time: item.confirmed_slot || "",
    status: statusLabel(item.status),
    requestedSlots: item.requested_slots || [],
    confirmedSlot: item.confirmed_slot,
    agent: item.agent_name || item.agent || "Pending"
  };
}

export function mapPayment(item = {}) {
  const breakdown = item.amount_breakdown || {};
  const amount = item.total_amount || Object.values(breakdown).reduce((sum, value) => sum + Number(value || 0), 0);
  return {
    ...item,
    id: item.id,
    description: item.description || `Payment #${item.id}`,
    date: item.created_at?.slice?.(0, 10) || "",
    amount,
    type: item.type || "Payment",
    method: item.gateway_ref || "Sandbox",
    receipt: item.gateway_ref || `RCP-${item.id}`,
    status: statusLabel(item.status)
  };
}

export function mapServiceOrder(item = {}) {
  return {
    ...item,
    id: item.id,
    orderId: `SRV-${item.id}`,
    service: statusLabel(item.service_type),
    provider: item.vendor_name || "Vendor pending",
    scheduledDate: item.schedule?.slice?.(0, 10),
    scheduledTime: item.schedule,
    amount: item.amount,
    bookedOn: item.created_at?.slice?.(0, 10),
    status: item.status
  };
}
