// api/axios.ts
import axios, { AxiosError } from 'axios'
import { useAuthStore } from '../stores/useAuthStore'
import { getPortalInfo } from '../utils/getPortalInfo'

const portal = getPortalInfo()
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

// Determine tenant segment for API
const tenantSegment = portal.type === 'superadmin' ? 'super-admin' : portal.tenantId
const API = axios.create({
  baseURL: `${baseURL}/${tenantSegment}`,
  withCredentials: false, // JWT in headers
})

// Request interceptor: attach access token only if hydrated
API.interceptors.request.use((config) => {
  const { _hasHydrated, accessToken } = useAuthStore.getState()
  if (_hasHydrated && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// Response interceptor: handle 401 + refresh token
API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const { _hasHydrated, refreshToken, logout, login } = useAuthStore.getState()
    const originalRequest: any = error.config

    if (!_hasHydrated) return Promise.reject(error)

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      refreshToken
    ) {
      originalRequest._retry = true

      try {
        const res = await axios.post(`${baseURL}/${tenantSegment}/auth/refresh`, { token: refreshToken })
        const newAccessToken: string = res.data.data.accessToken

        // update Zustand store
        login({ accessToken: newAccessToken, refreshToken })

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return API(originalRequest)
      } catch {
        // logout and redirect to appropriate login path
        logout()
        // const loginPath =
        //   portal.type === 'superadmin'
        //     ? '/super-admin/login'
        //     : `/tenants/${portal.tenantId}/login`
        // window.location.href = loginPath
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default API


// import axios, { AxiosError } from 'axios';
// import { useAuthStore } from '../stores/useAuthStore';
// import { getPortalInfo } from '../utils/getPortalInfo';


// const tenant = getPortalInfo(); // e.g. "wl1"
// // const baseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// // export const baseURL =
// //   import.meta.env.VITE_API_URL ||
// //   `${window.location.protocol}//${window.location.hostname}:${port}/api`;

// export const baseURL =import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// let tenantName = tenant.type === 'superadmin' ? 'super-admin' : `${tenant.tenantId}`

// const API = axios.create({
//   baseURL: `${baseURL}/${tenantName}`,
//   withCredentials: false, // cookies not used; JWT in header
// });

// API.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().accessToken;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// API.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError<any>) => {
//     const { logout, refreshToken } = useAuthStore.getState();
//     const originalRequest: any = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest?._retry &&
//       refreshToken
//     ) {
//       originalRequest._retry = true;
//       try {
//         const res = await axios.post(`${baseURL}/auth/refresh`, {
//           token: refreshToken,
//         });

//         const newAccessToken: string = res.data.data.accessToken;

//         useAuthStore.getState().login({
//           accessToken: newAccessToken,
//           refreshToken,
//         });

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return API(originalRequest);
//       } catch {
//         logout();
//         window.location.href = '/login';
//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;


// import axios, { AxiosError } from 'axios';
// import { useAuthStore } from '../stores/useAuthStore';

// const port = 4000;
// export const baseURL = `${window.location.protocol}//${window.location.hostname}:${port}/api`;

// // const baseURL = import.meta.env.VITE_API_URL;          // e.g. http://localhost:3000/api

// // ────────────────────────────────────────────────────────────
// // 1. Create instance
// // ────────────────────────────────────────────────────────────
// const API = axios.create({
//   baseURL,
//   withCredentials: false,   // cookies not used; JWT in header
// });

// // ────────────────────────────────────────────────────────────
// // 2. Request interceptor – attach Bearer token
// // ────────────────────────────────────────────────────────────
// API.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().accessToken;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // ────────────────────────────────────────────────────────────
// // 3. Response interceptor – auto‑refresh on 401, then retry
// // ────────────────────────────────────────────────────────────
// API.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError<any>) => {
//     const { logout, refreshToken } = useAuthStore.getState();
//     const originalRequest: any = error.config;

//     // only attempt refresh once per request chain
//     if (
//       error.response?.status === 401 &&
//       !originalRequest?._retry &&
//       refreshToken
//     ) {
//       originalRequest._retry = true;
//       try {
//         const res = await axios.post(`${baseURL}/auth/refresh`, {
//           token: refreshToken,
//         });

//         const newAccessToken: string = res.data.data.accessToken;

//         // Update store with fresh tokens
//         useAuthStore.getState().login({
//           accessToken: newAccessToken,
//           refreshToken,           // assume refresh token unchanged
//         });

//         // Re‑attach new token and retry original request
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return API(originalRequest);
//       } catch {
//         // Refresh failed → clear auth & redirect to login
//         logout();
//         window.location.href = '/login';
//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;
