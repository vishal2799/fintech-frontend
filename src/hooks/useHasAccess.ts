import { useAuthStore } from "../stores/useAuthStore";

export function useHasAccess(
  permission?: string | string[],
  allowedRoles: string[] = []
): boolean {
  const { user } = useAuthStore();

  if (!user || !user.staticRole) return false;

  // ✅ allow static roles to pass even if permission is undefined
  if (allowedRoles.includes(user.staticRole)) return true;

  // ✅ if permission is undefined, return false for EMPLOYEE
  if (!permission || user.staticRole !== 'EMPLOYEE') return false;

  const perms = user.permissions || [];

  if (Array.isArray(permission)) {
    return permission.every((p) => perms.includes(p));
  }

  return perms.includes(permission);
}
