import axios from "axios";
import { clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens } from "./tokenStorage.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

let refreshRequest = null;

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(normalizeApiError(error));
    }

    const refresh = getRefreshToken();
    if (!refresh) {
      clearAuthTokens();
      return Promise.reject(normalizeApiError(error));
    }

    originalRequest._retry = true;

    try {
      refreshRequest =
        refreshRequest ||
        axios.post(`${API_BASE_URL}/auth/token/refresh/`, { refresh });
      const { data } = await refreshRequest;
      setAuthTokens({ access: data.access, refresh });
      originalRequest.headers.Authorization = `Bearer ${data.access}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      clearAuthTokens();
      return Promise.reject(normalizeApiError(refreshError));
    } finally {
      refreshRequest = null;
    }
  }
);

export function unwrapData(response) {
  const data = response.data;
  return Array.isArray(data?.results) ? data.results : data;
}

export function normalizeApiError(error) {
  const detail = error.response?.data?.detail;
  const message =
    detail ||
    error.response?.data?.message ||
    error.message ||
    "Something went wrong. Please try again.";

  return {
    message,
    status: error.response?.status,
    data: error.response?.data,
    original: error
  };
}
