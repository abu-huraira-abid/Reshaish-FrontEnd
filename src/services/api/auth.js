import { apiClient, unwrapData } from "./client.js";
import { mapUser } from "./mappers.js";
import {
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  setStoredUser
} from "./tokenStorage.js";

function getJwtUserId(token) {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    const normalized = payload.replaceAll("-", "+").replaceAll("_", "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "="
    );
    const decoded = JSON.parse(globalThis.atob(padded));
    return decoded.user_id || decoded.userId || decoded.sub || null;
  } catch {
    return null;
  }
}

async function fetchCurrentUser(accessToken = getAccessToken()) {
  const userId = getJwtUserId(accessToken);
  if (userId) {
    const { data } = await apiClient.get(`/users/${userId}/`);
    return mapUser(data);
  }

  const users = unwrapData(await apiClient.get("/users/"));
  return mapUser(Array.isArray(users) ? users[0] : users);
}

export async function loginUser({ email, password, role }) {
  let tokens;
  try {
    const response = await apiClient.post("/auth/token/", {
      email,
      password
    });
    tokens = response.data;
  } catch (err) {
    const code = err.data?.code;
    const normalizedCode = Array.isArray(code) ? code[0] : code;
    if (normalizedCode === "email_not_verified") {
      err.emailVerificationRequired = true;
      err.email = email;
    }
    throw err;
  }
  setAuthTokens(tokens);

  const user = await fetchCurrentUser(tokens.access);
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
  return {
    email: payload.email,
    role: payload.role,
    requiresEmailVerification: true
  };
}

export async function resendEmailOtp(email) {
  const { data } = await apiClient.post("/auth/email/send-otp/", { email });
  return data;
}

export async function verifyEmailOtp({ email, code }) {
  const { data } = await apiClient.post("/auth/email/verify/", { email, code });
  setAuthTokens(data.tokens);
  setStoredUser(mapUser(data.user));
  return {
    user: mapUser(data.user),
    tokens: data.tokens
  };
}

export async function fetchProfile() {
  return fetchCurrentUser();
}

export async function updateProfile(userId, payload) {
  const body = new FormData();
  body.append("first_name", payload.first_name || "");
  body.append("last_name", payload.last_name || "");
  body.append("email", payload.email || "");
  body.append("username", payload.email || payload.username || "");
  body.append("phone", payload.phone || "");
  body.append("city", payload.city || "");
  if (payload.profile_photo) {
    body.append("profile_photo", payload.profile_photo);
  }

  const { data } = await apiClient.patch(`/users/${userId}/`, body, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  const user = mapUser(data);
  setStoredUser(user);
  return user;
}

export async function changePassword(payload) {
  const { data } = await apiClient.post("/users/change-password/", {
    current_password: payload.currentPassword,
    new_password: payload.newPassword
  });
  return data;
}

export async function logoutUser() {
  const refresh = getRefreshToken();
  await apiClient.post("/auth/logout/", refresh ? { refresh } : {});
}
