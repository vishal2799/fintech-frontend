export const getPortalInfo = () => {
  const host = window.location.hostname; // e.g., wl1.localhost, superadmin.localhost, client.com
  const pathname = window.location.pathname; // e.g., /admin/login

  const isLocal = host.includes('localhost');
  const parts = host.split('.');
  const subdomain = parts.length > (isLocal ? 1 : 2) ? parts[0] : null;

  let type: 'superadmin' | 'tenant' | null = null;
  if (subdomain === 'superadmin') {
    type = 'superadmin';
  } else if (subdomain) {
    type = 'tenant';
  } else {
    // Custom domain fallback (e.g., client.com)
    type = 'tenant';
  }

  // Extract portalSlug from first segment in path (e.g., 'admin' from /admin/login)
  const portalSlug = type === 'tenant' ? pathname.split('/')[1] || '' : '';
  const portalPath = portalSlug ? `/${portalSlug}` : '';

  return { subdomain, type, portalSlug, portalPath };
};
