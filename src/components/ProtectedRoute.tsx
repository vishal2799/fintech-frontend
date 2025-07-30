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

  // Not logged in
  if (!accessToken || !user) {
    return <Navigate to={loginPath} replace />;
  }

  // If role is EMPLOYEE, allow them through and handle permissions at page level
  if (user.staticRole === 'EMPLOYEE') {
    return <>{children}</>;
  }

  // Static role check
  const hasAccess = user.staticRole ? allowedRoles.includes(user.staticRole) : false;

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;


// import { Navigate, useLocation } from 'react-router';
// import { useAuthStore } from '../stores/useAuthStore';

// interface Props {
//   children: React.ReactNode;
//   allowedRoles: string[];
// }

// const ProtectedRoute = ({ children, allowedRoles }: Props) => {
//   const { accessToken, user } = useAuthStore();
//   const location = useLocation();

//   const segments = location.pathname.split('/').filter(Boolean);
//   const base = segments[0];
//   const loginPath = base ? `/${base}/login` : '/login';

//   if (!accessToken || !user) {
//     return <Navigate to={loginPath} replace />;
//   }

//   const hasAccess = user.staticRole ? allowedRoles.includes(user.staticRole) : false;

//   if (!hasAccess) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


