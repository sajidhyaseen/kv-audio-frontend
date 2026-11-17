import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** Best human-readable message from a failed request. */
export function apiError(err, fallback = "Something went wrong") {
  return err?.response?.data?.message || err?.response?.data?.error || (err?.request ? "Cannot reach the server" : fallback);
}

export default api;
