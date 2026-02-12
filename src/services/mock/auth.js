import { mockDelay } from "../api.js";

const demoUsers = [
  { id: "u-1", name: "Amina Khan", role: "tenant", email: "tenant@demo.com" },
  { id: "u-2", name: "Bilal Ahmed", role: "landlord", email: "landlord@demo.com" },
  { id: "u-3", name: "Sara Malik", role: "agent", email: "agent@demo.com" },
  { id: "u-4", name: "Admin", role: "admin", email: "admin@demo.com" }
];

export function loginUser({ email, role }) {
  const user = demoUsers.find((u) => u.email === email) || {
    id: `u-${Date.now()}`,
    name: email?.split("@")[0] || "New User",
    role: role || "tenant",
    email
  };
  return mockDelay(user, 700);
}

export function registerUser(payload) {
  const user = {
    id: `u-${Date.now()}`,
    name: payload.name,
    role: payload.role,
    email: payload.email
  };
  return mockDelay(user, 900);
}

export function fetchProfile(userId) {
  const user = demoUsers.find((u) => u.id === userId) || demoUsers[0];
  return mockDelay({
    ...user,
    city: "Lahore",
    preferences: ["Verified", "Near Transit"]
  });
}
