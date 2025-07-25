import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const baseURL = import.meta.env.VITE_API_URL;          // e.g. http://localhost:3000/api

// ────────────────────────────────────────────────────────────
// 1. Create instance
// ────────────────────────────────────────────────────────────
const API = axios.create({
  baseURL,
  withCredentials: false,   // cookies not used; JWT in header
});

// ────────────────────────────────────────────────────────────
// 2. Request interceptor – attach Bearer token
// ────────────────────────────────────────────────────────────
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ────────────────────────────────────────────────────────────
// 3. Response interceptor – auto‑refresh on 401, then retry
// ────────────────────────────────────────────────────────────
API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const { logout, refreshToken } = useAuthStore.getState();
    const originalRequest: any = error.config;

    // only attempt refresh once per request chain
    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${baseURL}/auth/refresh`, {
          token: refreshToken,
        });

        const newAccessToken: string = res.data.data.accessToken;

        // Update store with fresh tokens
        useAuthStore.getState().login({
          accessToken: newAccessToken,
          refreshToken,           // assume refresh token unchanged
        });

        // Re‑attach new token and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch {
        // Refresh failed → clear auth & redirect to login
        logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
