import { apiClient } from "./client.js";

export async function fetchMyOnboarding() {
  const { data } = await apiClient.get("/onboarding/me/");
  return data;
}

export async function submitOnboarding(payload) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  const { data } = await apiClient.patch("/onboarding/me/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return data;
}
