import { Navigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
// import { usePortal } from "../context/PortalContext";
import { Center, Loader } from "@mantine/core";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  // const { portalPath } = usePortal();
  const { accessToken, user, _hasHydrated } = useAuthStore();

  console.log("[ProtectedRoute] State:", { _hasHydrated, accessToken, user });

if (!_hasHydrated) {
  return (
    <Center style={{ height: '100vh' }}>
      <Loader size="lg" />
    </Center>
  )
}

  // const loginPath = portalPath ? `${portalPath}/login` : "/login";
  const loginPath = "/login";

  console.log(loginPath)

  if (!accessToken || !user) {
    return <Navigate to={loginPath} replace />;
  }

  if (user.staticRole === "EMPLOYEE") {
    return <>{children}</>;
  }

  const hasAccess = allowedRoles.includes(user.staticRole ?? "");
  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};


// const ProtectedRoute = ({ children, allowedRoles }: Props) => {
//   const { portalPath } = usePortal();
//   const { accessToken, user } = useAuthStore();
//   const [hydrated, setHydrated] = useState(false);

//   // ✅ Hydration check (prevents false redirects)
//   useEffect(() => {
//     const unsub = useAuthStore.persist.onFinishHydration(() => {
//       setHydrated(true);
//     });
//     return () => {
//       unsub?.();
//     };
//   }, []);

//   if (!hydrated) {
//     return (
//       <Center style={{ height: "100vh" }}>
//         <Loader size="lg" />
//       </Center>
//     );
//   }

//   // Build login path dynamically (works in staging/localhost/production)
//   const loginPath = portalPath ? `${portalPath}/login` : "/login";

//   // ✅ If no token or user after hydration, go to login
//   if (!accessToken || !user) {
//     return <Navigate to={loginPath} replace />;
//   }

//   // EMPLOYEE role always allowed
//   if (user.staticRole === "EMPLOYEE") {
//     return <>{children}</>;
//   }

//   // ✅ Check allowed roles
//   const hasAccess = user.staticRole
//     ? allowedRoles.includes(user.staticRole)
//     : false;

//   if (!hasAccess) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };

export default ProtectedRoute;


// import { Navigate } from "react-router";
// import { useAuthStore } from "../stores/useAuthStore";
// import { usePortal } from "../context/PortalContext";

// interface Props {
//   children: React.ReactNode;
//   allowedRoles: string[];
// }

// const ProtectedRoute = ({ children, allowedRoles }: Props) => {
//   const { portalPath } = usePortal();
//   const { accessToken, user } = useAuthStore();

//   const loginPath = portalPath ? `${portalPath}/login` : "/login";

//   if (!accessToken || !user) {
//     return <Navigate to={loginPath} replace />;
//   }

//   if (user.staticRole === "EMPLOYEE") {
//     return <>{children}</>;
//   }

//   const hasAccess = user.staticRole
//     ? allowedRoles.includes(user.staticRole)
//     : false;

//   if (!hasAccess) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;



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



