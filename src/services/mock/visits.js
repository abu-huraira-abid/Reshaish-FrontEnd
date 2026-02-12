import { mockDelay } from "../api.js";

const visitRequests = [
  {
    id: "v-201",
    listingId: "l-100",
    property: "Modern Studio Apartment",
    location: "Gulberg III, Lahore",
    date: "2025-02-25",
    time: "2:00 PM",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    status: "Scheduled",
    requestedSlots: ["Mar 12, 10:00", "Mar 12, 14:00"],
    confirmedSlot: "Mar 12, 10:00",
    agent: "Agent Fatima Khan"
  },
  {
    id: "v-202",
    listingId: "l-101",
    property: "Cozy 2 Bedroom Flat",
    location: "Clifton Block 4, Karachi",
    date: "2025-02-23",
    time: "11:00 AM",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
    status: "Requested",
    requestedSlots: ["Mar 14, 11:00"],
    confirmedSlot: null,
    agent: "Pending"
  },
  {
    id: "v-203",
    listingId: "l-102",
    property: "Spacious Villa with Pool",
    location: "E-11, Islamabad",
    date: "2025-02-20",
    time: "3:00 PM",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    status: "Completed",
    requestedSlots: ["Mar 10, 15:00"],
    confirmedSlot: "Mar 10, 15:00",
    agent: "Agent Sami Raza"
  }
];

export function fetchVisitRequests() {
  return mockDelay(visitRequests, 600);
}

export function updateVisitStatus(id, status) {
  const visit = visitRequests.find((v) => v.id === id);
  if (visit) visit.status = status;
  return mockDelay(visit, 400);
}

export function generateQrToken(id) {
  return mockDelay({
    visitId: id,
    token: `QR-${id}-${Date.now()}`
  });
}
