import { mockDelay } from "../api.js";

const intents = [
  {
    id: "i-301",
    listingId: "l-100",
    property: "Modern Studio Apartment",
    location: "Gulberg III, Lahore",
    tenant: {
      name: "Hassan Ali",
      phone: "+92 300 1234567",
      email: "hassan.ali@email.com",
      occupation: "Software Engineer",
      income: "PKR 150,000"
    },
    lease: {
      moveIn: "2025-01-14",
      duration: "12 months",
      submittedOn: "2024-12-19",
      emergencyContact: "Fatima Ali",
      emergencyPhone: "+92 300 7654321"
    },
    notes: "Looking for a long-term stay. Non-smoker, vegetarian.",
    payment: {
      deposit: 70000,
      rent: 35000,
      total: 105000
    },
    status: "pending"
  },
  {
    id: "i-302",
    listingId: "l-101",
    property: "Cozy 2 Bedroom Flat",
    location: "Clifton Block 4, Karachi",
    tenant: {
      name: "Maryam Khan",
      phone: "+92 301 2223344",
      email: "maryam.khan@email.com",
      occupation: "Product Manager",
      income: "PKR 120,000"
    },
    lease: {
      moveIn: "2025-01-09",
      duration: "12 months",
      submittedOn: "2024-12-17",
      emergencyContact: "Bilal Khan",
      emergencyPhone: "+92 301 4443322"
    },
    notes: "Prefers quiet neighborhood.",
    payment: {
      deposit: 110000,
      rent: 55000,
      total: 165000
    },
    status: "accepted"
  },
  {
    id: "i-303",
    listingId: "l-102",
    property: "Spacious Villa with Pool",
    location: "E-11, Islamabad",
    tenant: {
      name: "Saad Ahmed",
      phone: "+92 333 9876543",
      email: "saad.ahmed@email.com",
      occupation: "Business Analyst",
      income: "PKR 180,000"
    },
    lease: {
      moveIn: "2025-01-31",
      duration: "6 months",
      submittedOn: "2024-12-14",
      emergencyContact: "Hira Ahmed",
      emergencyPhone: "+92 333 4567890"
    },
    notes: "Need parking for 2 cars.",
    payment: {
      deposit: 250000,
      rent: 125000,
      total: 375000
    },
    status: "rejected"
  }
];

export function fetchIntents() {
  return mockDelay(intents, 600);
}

export function submitIntent(payload) {
  const intent = { id: `i-${Date.now()}`, status: "pending", ...payload };
  intents.push(intent);
  return mockDelay(intent, 800);
}

export function updateIntentStatus(id, status) {
  const intent = intents.find((i) => i.id === id);
  if (intent) intent.status = status;
  return mockDelay(intent, 400);
}
