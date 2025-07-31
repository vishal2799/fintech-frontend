export function checkAccess(
  user: any,
  permission?: string | string[],
  allowedRoles: string[] = []
): boolean {
  if (!user || !user.staticRole) return false;

  const { staticRole, permissions = [] } = user;

  if (staticRole === 'EMPLOYEE') {
    if (!permission) return false;

    return Array.isArray(permission)
      ? permission.every((p) => permissions.includes(p))
      : permissions.includes(permission);
  }

  return allowedRoles.includes(staticRole);
}
