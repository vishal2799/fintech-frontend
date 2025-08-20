// utils/getPortalInfo.ts
export type PortalInfo = {
  type: 'superadmin' | 'tenant';
  tenantId: string | null;      // tenant id when type === 'tenant'
  portalSlug: string | null;    // the next segment after tenantId (e.g. "admin" or "retailer")
  portalPath: string;           // '/admin' or ''
  basename: string;             // router basename: '/super-admin' or '/tenants/:tenantId'
  loginPath: string;            // fully-formed login path for redirects
  fullPath: string;             // original window.location.pathname
};

export const getPortalInfo = (): PortalInfo => {
  const pathname = window.location.pathname || '/';
  const segments = pathname.split('/').filter(Boolean).map(s => s.toLowerCase());

  // Default values (treat unknown as superadmin)
  let type: PortalInfo['type'] = 'superadmin';
  let tenantId: string | null = null;
  let portalSlug: string | null = null;
  let basename = '/super-admin';

  // /super-admin/* → superadmin mode, basename /super-admin
  if (segments[0] === 'super-admin') {
    type = 'superadmin';
    portalSlug = segments[1] || null;
    basename = '/super-admin';
  }
  // /tenants/:tenantId/* → tenant mode, basename /tenants/:tenantId
  else if (segments[0] === 'tenants' && segments[1]) {
    type = 'tenant';
    tenantId = segments[1];
    portalSlug = segments[2] || null;
    basename = `/tenants/${tenantId}`;
  } else {
    // If path doesn't match explicit patterns, decide default:
    // keep superadmin as default for clarity (you can change this)
    type = 'superadmin';
    basename = '/super-admin';
  }

  const portalPath = portalSlug ? `/${portalSlug}` : '';
  const loginPath = `${basename}/login`;
  const fullPath = pathname;

  return {
    type,
    tenantId,
    portalSlug,
    portalPath,
    basename,
    loginPath,
    fullPath,
  };
};


// export const getPortalInfo = () => {
//   const pathname = window.location.pathname;
//   const segments = pathname.split("/").filter(Boolean);

//   let type: "superadmin" | "tenant" | null = null;
//   let tenantId: string | null = null;
//   let portalSlug = "";

//   // /super-admin/*
//   if (segments[0] === "super-admin") {
//     type = "superadmin";
//     portalSlug = segments[1] || "";
//   }

//   // /tenants/:tenantId/*
//   else if (segments[0] === "tenants" && segments[1]) {
//     type = "tenant";
//     tenantId = segments[1];
//     portalSlug = segments[2] || "";
//   }

//   return {
//     type,
//     tenantId,
//     portalSlug,
//     fullPath: pathname,
//   };
// };


// export const getPortalInfo = () => {
//   const host = window.location.hostname;
//   const pathname = window.location.pathname;

//   // ✅ Feature flag from env (VITE_ENABLE_LOCALHOST_ROUTING=true)
//   const enableLocalRouting = import.meta.env.VITE_ENABLE_LOCALHOST_ROUTING === 'true';

//   // Treat both localhost and "flag-enabled staging" the same way
//   const isLocalLike = host.includes('localhost') || enableLocalRouting;

//   let subdomain: string | null = null;
//   let type: 'superadmin' | 'tenant' | null = null;
//   let portalSlug = '';
//   let portalPath = '';

//   if (isLocalLike) {
//     // --- Localhost-style path detection ---
//     const segments = pathname.split('/').filter(Boolean);
//     if (segments[0] === 'super-admin') {
//       type = 'superadmin';
//       // subdomain = 'super-admin'
//     } else if (segments[0] === 'tenants' && segments[1]) {
//       type = 'tenant';
//       subdomain = segments[1]; // tenantId as "subdomain"
//       portalSlug = segments[2] || '';
//     }
//   } else {
//     // --- Subdomain-based production mode ---
//     const parts = host.split('.');
//     subdomain = parts.length > 2 ? parts[0] : null;

//     if (subdomain === 'superadmin') {
//       type = 'superadmin';
//     } else if (subdomain) {
//       type = 'tenant';
//     } else {
//       type = 'tenant'; // custom domain fallback
//     }

//     if (type === 'tenant') {
//       portalSlug = pathname.split('/')[1] || '';
//     }
//   }

//   portalPath = portalSlug ? `/${portalSlug}` : '';
//   return { subdomain, type, portalSlug, portalPath };
// };


// export const getPortalInfo = () => {
//   const host = window.location.hostname;
//   const pathname = window.location.pathname;
//   const isLocal = host.includes('localhost');

//   let subdomain: string | null = null;
//   let type: 'superadmin' | 'tenant' | null = null;
//   let portalSlug = '';
//   let portalPath = '';

//   if (isLocal) {
//     // --- Dev mode: detect from path ---
//     const segments = pathname.split('/').filter(Boolean); // remove empty
//     if (segments[0] === 'super-admin') {
//       type = 'superadmin';
//     } else if (segments[0] === 'tenants' && segments[1]) {
//       type = 'tenant';
//       subdomain = segments[1]; // using tenantId as "subdomain"
//       portalSlug = segments[2] || '';
//     }
//   } else {
//     // --- Production: detect from subdomain ---
//     const parts = host.split('.');
//     subdomain = parts.length > (isLocal ? 1 : 2) ? parts[0] : null;

//     if (subdomain === 'superadmin') {
//       type = 'superadmin';
//     } else if (subdomain) {
//       type = 'tenant';
//     } else {
//       type = 'tenant'; // custom domain fallback
//     }

//     if (type === 'tenant') {
//       portalSlug = pathname.split('/')[1] || '';
//     }
//   }

//   portalPath = portalSlug ? `/${portalSlug}` : '';
//   return { subdomain, type, portalSlug, portalPath };
// };


// export const getPortalInfo = () => {
//   const host = window.location.hostname; // e.g., wl1.localhost, superadmin.localhost, client.com
//   const pathname = window.location.pathname; // e.g., /admin/login

//   const isLocal = host.includes('localhost');
//   const parts = host.split('.');
//   const subdomain = parts.length > (isLocal ? 1 : 2) ? parts[0] : null;

//   let type: 'superadmin' | 'tenant' | null = null;
//   if (subdomain === 'superadmin') {
//     type = 'superadmin';
//   } else if (subdomain) {
//     type = 'tenant';
//   } else {
//     // Custom domain fallback (e.g., client.com)
//     type = 'tenant';
//   }

//   // Extract portalSlug from first segment in path (e.g., 'admin' from /admin/login)
//   const portalSlug = type === 'tenant' ? pathname.split('/')[1] || '' : '';
//   const portalPath = portalSlug ? `/${portalSlug}` : '';

//   return { subdomain, type, portalSlug, portalPath };
// };
