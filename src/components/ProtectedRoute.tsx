import { Navigate } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { accessToken, user } = useAuthStore();

  if (!accessToken || !user) return <Navigate to="/login" />;

  const hasAccess = user.roleNames.some((role) => allowedRoles.includes(role));
  if (!hasAccess) return <Navigate to="/unauthorized" />;

  return <>{children}</>;
};

export default ProtectedRoute;
