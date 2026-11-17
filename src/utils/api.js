import axios from "axios";

const configuredUrl = new URL(import.meta.env.VITE_BACKEND_URL);
if (import.meta.env.PROD && configuredUrl.protocol !== "https:") {
  throw new Error("VITE_BACKEND_URL must use HTTPS in production.");
}
const localHosts = new Set(["localhost", "127.0.0.1"]);
const baseURL = import.meta.env.DEV && localHosts.has(configuredUrl.hostname)
  ? `${configuredUrl.protocol}//${window.location.hostname}:${configuredUrl.port}`
  : configuredUrl.toString();

const api = axios.create({ baseURL, withCredentials: true });

api.interceptors.request.use((config) => {
  const storedCsrf = sessionStorage.getItem("csrfToken");
  if (storedCsrf) config.headers["X-CSRF-Token"] = storedCsrf;
  return config;
});

/** Best human-readable message from a failed request. */
export function apiError(err, fallback = "Something went wrong") {
  return err?.response?.data?.message || err?.response?.data?.error || (err?.request ? "Cannot reach the server" : fallback);
}

export default api;
