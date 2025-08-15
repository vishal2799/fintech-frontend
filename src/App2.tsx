import {SuperAdminApp} from './routes/SuperAdminApp';
import TenantApp from './routes/TenantApp';
import { usePortal } from './context/PortalContext';
import { AppThemeProvider } from './context/AppThemeProvider';

export default function AppRouter() {
  const { type } = usePortal();


    if (!type) return <div>Invalid or loading portal...</div>;

  return (
        <AppThemeProvider>
                {type === 'superadmin' ? <SuperAdminApp /> : <TenantApp />}
        </AppThemeProvider>
)

//   if (type === 'superadmin') {
//     return useRoutes([
//       { path: '/super-admin/*', element: <div>Super Admin</div> }
//     ]);
//   }

//   if (type === 'tenant') {
//     return useRoutes([
//       { path: '/tenants/:tenantId/*', element: <div>tenants</div> }
//     ]);
//   }

//   return null;
}


// import { AppThemeProvider } from "./context/AppThemeProvider";
// import { usePortal } from "./context/PortalContext";
// import SuperAdminApp from "./routes/SuperAdminApp";
// import TenantApp from "./routes/TenantApp";

// import '@mantine/dates/styles.css';
// import '@mantine/notifications/styles.css';

// export default function App() {

//   const portal = usePortal();

//   if (!portal?.type) return <div>Invalid or loading portal...</div>;

//   return (
//         <AppThemeProvider>
//                 {portal.type === 'superadmin' ? <SuperAdminApp /> : <TenantApp />}
//         </AppThemeProvider>
// )
// }
