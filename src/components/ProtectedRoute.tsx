import { Navigate } from 'react-router';
import { isLoggedIn, getUserPayload } from '../utils/auth';

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  const user = getUserPayload();
  if (!user || !user.roleNames.some(role => allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
