export const getPortalInfo = () => {
  const host = window.location.host;
  const parts = host.split('.');
  const isLocal = host.includes('localhost');
  const subdomain = parts.length > (isLocal ? 1 : 2) ? parts[0] : null;

  let type: 'superadmin' | 'tenant' | null = null;
  if (subdomain === 'superadmin') type = 'superadmin';
  else if (subdomain) type = 'tenant';

  return { subdomain, type };
};
