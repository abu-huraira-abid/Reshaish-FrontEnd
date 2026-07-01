import { apiClient, unwrapData } from "./client.js";

const fallbackAvatar = "/rehaish-logo.png";
export const demoFlatmates = [
  {
    id: "demo-1",
    userId: "demo-1",
    name: "Ayesha Khan",
    image: fallbackAvatar,
    role: "Software Engineer",
    budget: 28000,
    city: "Lahore",
    location: "DHA",
    locations: ["DHA", "Gulberg"],
    rating: "4.8",
    reviews: 12,
    preferences: { gender: "Female", work_schedule: "9-5" },
    bio: "Clean, quiet, and looking for a respectful shared home near DHA or Gulberg.",
    isDemo: true
  },
  {
    id: "demo-2",
    userId: "demo-2",
    name: "Hamza Ali",
    image: fallbackAvatar,
    role: "Marketing Analyst",
    budget: 22000,
    city: "Lahore",
    location: "Johar Town",
    locations: ["Johar Town", "Model Town"],
    rating: "4.6",
    reviews: 8,
    preferences: { gender: "Any", work_schedule: "Flexible" },
    bio: "Friendly tenant, non-smoker, prefers a tidy apartment and shared bills.",
    isDemo: true
  },
  {
    id: "demo-3",
    userId: "demo-3",
    name: "Sara Malik",
    image: fallbackAvatar,
    role: "Has a property",
    title: "Room available in verified apartment",
    property: "Two-bed apartment near MM Alam Road",
    budget: 30000,
    city: "Lahore",
    location: "Gulberg",
    locations: ["Gulberg"],
    rating: "New",
    reviews: 0,
    bio: "One private room available from next month. Looking for a professional flatmate.",
    isListing: true,
    isDemo: true
  }
];

function mapFlatmateProfile(item = {}) {
  const preferences = item.preferences || {};
  return {
    ...item,
    id: item.id,
    userId: item.user,
    name: item.user_name || item.user_email || `User #${item.user}`,
    email: item.user_email || "",
    image: item.user_photo || fallbackAvatar,
    role: preferences.occupation || "Tenant",
    budget: item.budget,
    city: item.city,
    locations: preferences.preferred_locations || [item.city].filter(Boolean),
    rating: preferences.rating || "New",
    reviews: preferences.reviews || 0,
    preferences,
    bio: item.bio || ""
  };
}

function mapFlatmateListing(item = {}) {
  const preferences = item.preferences || {};
  return {
    ...item,
    id: item.id,
    userId: item.created_by,
    name: item.owner_name || item.owner_email || "Tenant",
    email: item.owner_email || "",
    image: item.owner_photo || fallbackAvatar,
    role: "Has a property",
    title: item.title,
    property: item.property_title,
    location: item.property_city,
    city: item.property_city,
    address: item.property_address,
    budget: item.expected_share,
    rentAmount: item.rent_amount,
    availableRoom: item.available_room,
    availableFrom: item.available_from,
    preferences,
    locations: [item.property_city].filter(Boolean),
    bio: item.description || "",
    isListing: true
  };
}

export async function fetchFlatmates() {
  const [profiles, listings] = await Promise.all([
    unwrapData(await apiClient.get("/flatmate-profiles/")),
    unwrapData(await apiClient.get("/flatmate-listings/"))
  ]);
  return [
    ...profiles.map(mapFlatmateProfile),
    ...listings.map(mapFlatmateListing),
    ...demoFlatmates
  ];
}

export async function saveFlatmateProfile(payload) {
  const body = {
    city: payload.city,
    budget: Number(payload.maxBudget || payload.budget || 0),
    bio: payload.bio || "",
    match_visibility: payload.matchVisibility ?? true,
    preferences: {
      age: payload.age,
      gender: payload.gender,
      occupation: payload.occupation,
      work_schedule: payload.workSchedule,
      min_budget: Number(payload.minBudget || 0),
      max_budget: Number(payload.maxBudget || payload.budget || 0),
      move_in_date: payload.moveInDate,
      preferred_locations: payload.preferredLocations || [],
      interests: payload.interests || []
    }
  };
  const { data } = await apiClient.post("/flatmate-profiles/", body);
  return mapFlatmateProfile(data);
}

export async function fetchFlatmateListings() {
  const data = unwrapData(await apiClient.get("/flatmate-listings/"));
  return data.map(mapFlatmateListing);
}

export async function saveFlatmateListing(payload) {
  const { data } = await apiClient.post("/flatmate-listings/", {
    tenancy: payload.tenancy,
    title: payload.title,
    available_room: payload.availableRoom,
    expected_share: Number(payload.expectedShare || 0),
    available_from: payload.availableFrom || null,
    house_rules: payload.houseRules || [],
    preferences: payload.preferences || {},
    description: payload.description || "",
    status: payload.status || "active"
  });
  return mapFlatmateListing(data);
}

export async function fetchMyActiveRentals() {
  const data = unwrapData(await apiClient.get("/rental-tenancies/"));
  return data.map((item) => ({
    ...item,
    label: item.property_title,
    city: item.property_city
  }));
}
