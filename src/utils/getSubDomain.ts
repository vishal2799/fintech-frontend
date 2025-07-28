// utils/getSubdomain.ts
export const getSubdomain = (): string | null => {
  const host = window.location.host;
  const parts = host.split('.');
  const isLocalhost = host.includes('localhost');
  return parts.length > (isLocalhost ? 1 : 2) ? parts[0] : null;
};
