import { useAuthStore } from '../stores/useAuthStore';

export function useHasAccess(
  permission?: string | string[],
  allowedRoles: string[] = []
): boolean {
  const { user } = useAuthStore();

  if (!user || !user.staticRole) return false;

  const { staticRole, permissions = [] } = user;

  // ✅ Employees must always go through permission check
  if (staticRole === 'EMPLOYEE') {
    if (!permission) return false;

    return Array.isArray(permission)
      ? permission.every((p) => permissions.includes(p))
      : permissions.includes(permission);
  }

  // ✅ For all other roles, check only allowedRoles
  return allowedRoles.includes(staticRole);
}
