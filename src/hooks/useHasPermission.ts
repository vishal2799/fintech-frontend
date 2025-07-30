import { useAuthStore } from '../stores/useAuthStore';

export function useHasPermission(permission: string | string[]) {
  const { user } = useAuthStore();

  if (!user || user.staticRole !== 'EMPLOYEE') return false;

  const perms = user.permissions || [];

  if (Array.isArray(permission)) {
    return permission.every((p) => perms.includes(p));
  }

  return perms.includes(permission);
}
