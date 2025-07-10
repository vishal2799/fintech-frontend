export function getSubdomain(): string | null {
  const host = window.location.hostname;
  if (host.includes('localhost')) return 'local';
  const parts = host.split('.');
  return parts.length >= 3 ? parts[0] : null;
}
