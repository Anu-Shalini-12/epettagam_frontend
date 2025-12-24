import axios from "axios";
import { BASE_URL } from "../utilities/config";

// Fetch CSRF token once
export const initCSRF = async () => {
  try {
    const res = await axios.get(`${BASE_URL}csrf-token`, {
      withCredentials: true,
    });
    window.csrfToken = res.data.csrfToken;
  } catch (err) {
    console.error("CSRF token fetch failed", err);
  }
};

// GLOBAL interceptor
axios.interceptors.request.use(
  (config) => {
    config.withCredentials = true;

    if (
      window.csrfToken &&
      ["post", "put", "patch", "delete"].includes(config.method)
    ) {
      config.headers["X-CSRF-Token"] = window.csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
