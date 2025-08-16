// utils/getTenantKey.ts
export function getTenantKey() {
  const enableLocalRouting = import.meta.env.VITE_ENABLE_LOCALHOST_ROUTING === 'true';
  const isLocalLike = window.location.hostname.includes('localhost') || enableLocalRouting;

  const pathParts = window.location.pathname.split("/").filter(Boolean);

  if (isLocalLike) {
    if (pathParts[0] === "tenants" && pathParts[1]) {
      return pathParts[1]; // tenant id
    }
    if (pathParts[0] === "super-admin") {
      return "superadmin"; // keep superadmin key separate if needed
    }
  }

  const hostParts = window.location.hostname.split(".");
  if (hostParts.length > 2) {
    return hostParts[0]; // subdomain
  }

  return "global"; // fallback
}

// // utils/getTenantKey.ts
// export function getTenantKey() {
//   const pathParts = window.location.pathname.split("/").filter(Boolean);
  
//   // dev: /tenants/wl1/admin/login → tenant = wl1
//   if (pathParts[0] === "tenants" && pathParts.length > 1) {
//     return pathParts[1];
//   }

//   // prod: subdomain.ourapp.com
//   const hostParts = window.location.hostname.split(".");
//   if (hostParts.length > 2) {
//     return hostParts[0]; // subdomain
//   }

//   return "global"; // fallback for superadmin
// }
