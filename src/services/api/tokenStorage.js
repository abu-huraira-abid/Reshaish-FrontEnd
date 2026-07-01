const ACCESS_TOKEN_KEY = "rehaish.accessToken";
const REFRESH_TOKEN_KEY = "rehaish.refreshToken";
const USER_KEY = "rehaish.user";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setAuthTokens(tokens = {}) {
  if (tokens.access) localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
  if (tokens.refresh) localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
}

export function clearAuthTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function clearStoredSession() {
  clearAuthTokens();
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
