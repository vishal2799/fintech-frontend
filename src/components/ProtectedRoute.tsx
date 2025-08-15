import { Navigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import { usePortal } from "../context/PortalContext";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { portalPath } = usePortal();
  const { accessToken, user } = useAuthStore();
  // const location = useLocation();
  // const [hydrated, setHydrated] = useState(false);

//   // Wait for zustand persist hydration
//   useEffect(() => {
//     const unsub = useAuthStore.persist.onFinishHydration(() => {
//       setHydrated(true);
//     });
//     return () => {
//       unsub?.();
//     };
//   }, []);

//   // Show nothing until hydrated (prevents false redirects)
// if (!hydrated) {
//   return (
//     <Center style={{ height: '100vh' }}>
//       <Loader size="lg" />
//     </Center>
//   );
// }

  const loginPath = portalPath ? `${portalPath}/login` : "/login";

  if (!accessToken || !user) {
    return <Navigate to={loginPath} replace />;
  }

  if (user.staticRole === "EMPLOYEE") {
    return <>{children}</>;
  }

  const hasAccess = user.staticRole
    ? allowedRoles.includes(user.staticRole)
    : false;

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

//   // Not logged in
//   if (!accessToken || !user) {
//     return <Navigate to={loginPath} replace />;
//   }

//   // If role is EMPLOYEE, allow them through and handle permissions at page level
//   if (user.staticRole === 'EMPLOYEE') {
//     return <>{children}</>;
//   }

//   // Static role check
//   const hasAccess = user.staticRole ? allowedRoles.includes(user.staticRole) : false;

//   if (!hasAccess) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;



