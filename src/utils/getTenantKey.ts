// utils/getTenantKey.ts
export function getTenantKey() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  
  // dev: /tenants/wl1/admin/login → tenant = wl1
  if (pathParts[0] === "tenants" && pathParts.length > 1) {
    return pathParts[1];
  }

  // prod: subdomain.ourapp.com
  const hostParts = window.location.hostname.split(".");
  if (hostParts.length > 2) {
    return hostParts[0]; // subdomain
  }

  return "global"; // fallback for superadmin
}
