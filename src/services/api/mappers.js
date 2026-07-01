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
      user.email,
    profilePhoto: user.profile_photo || user.profilePhoto || ""
  };
}

export function mapListing(item = {}) {
  const propertyType = item.property_type || item.type || "Apartment";
  const imageRecords = (item.images || []).map((image) =>
    typeof image === "string" ? { id: image, url: image } : image
  );
  return {
    ...item,
    id: item.id,
    title: item.title,
    landlordName: item.owner_name || item.ownerName || item.owner_email || "Landlord",
    landlordEmail: item.owner_email || item.landlordEmail || "",
    landlordPhone: item.owner_phone || item.landlordPhone || "",
    city: item.city,
    location: item.location || item.address,
    rent: item.rent,
    deposit: item.deposit,
    type: statusLabel(propertyType),
    portion: item.portion || "Full",
    residentialType: item.residentialType || "Residential",
    beds: item.bedrooms || item.beds || 1,
    baths: item.bathrooms || item.baths || 1,
    size: item.area_sqft || item.size || 0,
    status: statusLabel(item.status),
    lockedForEditing: Boolean(item.locked_for_editing || item.lockedForEditing),
    tag: item.tag || statusLabel(propertyType),
    address: item.address,
    imageRecords,
    images: imageRecords.length
      ? imageRecords.map((image) => image.url)
      : [DEFAULT_LISTING_IMAGE],
    ownershipProofUrl: item.ownership_proof_url || item.ownership_proof || "",
    description: item.description,
    amenities: item.amenities || item.facilities || []
  };
}

export function mapVisit(item = {}) {
  const listing = item.property_detail || item.property || {};
  const imageRecords = (listing.images || []).map((image) =>
    typeof image === "string" ? { id: image, url: image } : image
  );
  return {
    ...item,
    id: item.id,
    listingId: listing.id || item.property,
    property: listing.title || item.property_name || `Property #${item.property}`,
    location: listing.address || item.location || "",
    date: item.confirmed_slot?.slice?.(0, 10) || "",
    time: item.confirmed_slot || "",
    image: imageRecords[0]?.url || DEFAULT_LISTING_IMAGE,
    images: imageRecords.length ? imageRecords.map((image) => image.url) : [DEFAULT_LISTING_IMAGE],
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
  const status = item.status === "requested" ? "pending" : item.status;
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
    status
  };
}
