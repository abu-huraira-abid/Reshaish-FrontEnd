import { apiClient, unwrapData } from "./client.js";

export async function fetchFlatmates() {
  const data = unwrapData(await apiClient.get("/flatmate-profiles/"));
  return data.map((item) => ({
    ...item,
    id: item.id,
    name: item.user_name || `User #${item.user}`,
    budget: item.budget,
    city: item.city,
    preferences: item.preferences
  }));
}
