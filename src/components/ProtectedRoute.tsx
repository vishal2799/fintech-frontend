import { Navigate, useLocation } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { accessToken, user } = useAuthStore();
  const location = useLocation();

  const segments = location.pathname.split('/').filter(Boolean);
  const base = segments[0];
  const loginPath = base ? `/${base}/login` : '/login';

  if (!accessToken || !user) {
    return <Navigate to={loginPath} replace />;
  }

  const hasAccess = user.staticRole ? allowedRoles.includes(user.staticRole) : false;

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;



// import { Navigate } from 'react-router';
// import { useAuthStore } from '../stores/useAuthStore';

// interface Props {
//   children: React.ReactNode;
//   allowedRoles: string[];
// }

// const ProtectedRoute = ({ children, allowedRoles }: Props) => {
//   const { accessToken, user } = useAuthStore();

//   if (!accessToken || !user) return <Navigate to="/login" />;

//   const hasAccess = user.roleNames.some((role) => allowedRoles.includes(role));
//   if (!hasAccess) return <Navigate to="/unauthorized" />;

//   return <>{children}</>;
// };

// export default ProtectedRoute;
