import { Navigate } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';

type Props = {
  permission: string | string[];
  allowedRoles?: string[]; // Roles that skip permission check
  children: React.ReactNode;
};

export function PermissionGuard({ permission, allowedRoles = [], children }: Props) {
  const { user } = useAuthStore();

  // ❌ Not logged in or missing staticRole
  if (!user || !user.staticRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Static role is explicitly allowed (like SUPER_ADMIN)
  if (allowedRoles.includes(user.staticRole)) {
    return <>{children}</>;
  }

  // ✅ Check permissions if EMPLOYEE
  if (user.staticRole === 'EMPLOYEE' && user.permissions) {
    const perms = user.permissions;
    const hasPermission = Array.isArray(permission)
      ? permission.every((p) => perms.includes(p))
      : perms.includes(permission);

    if (hasPermission) {
      return <>{children}</>;
    }
  }

  // ❌ Fallback - no access
  return <Navigate to="/unauthorized" replace />;
}
