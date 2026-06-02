import { apiClient, unwrapData } from "./client.js";
import { mapUser } from "./mappers.js";
import { setAuthTokens, setStoredUser } from "./tokenStorage.js";

async function fetchCurrentUser() {
  const users = unwrapData(await apiClient.get("/users/"));
  return mapUser(Array.isArray(users) ? users[0] : users);
}

export async function loginUser({ email, password, role }) {
  const { data: tokens } = await apiClient.post("/auth/token/", {
    email,
    password
  });
  setAuthTokens(tokens);

  const user = await fetchCurrentUser();
  if (role && user.role !== role) {
    throw new Error("This account does not match the selected login type.");
  }

  setStoredUser(user);
  return { user, tokens };
}

export async function registerUser(payload) {
  const [firstName, ...rest] = String(payload.name || "").trim().split(" ");
  await apiClient.post("/auth/register/", {
    email: payload.email,
    username: payload.email,
    password: payload.password,
    first_name: firstName || payload.email,
    last_name: rest.join(" "),
    role: payload.role,
    city: payload.city
  });
  return loginUser({
    email: payload.email,
    password: payload.password,
    role: payload.role
  });
}

export async function fetchProfile() {
  return fetchCurrentUser();
}
