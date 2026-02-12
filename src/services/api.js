import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.rehaish.local",
  timeout: 15000
});

export const mockDelay = (data, time = 600) =>
  new Promise((resolve) => setTimeout(() => resolve(data), time));
