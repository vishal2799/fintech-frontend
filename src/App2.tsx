import { AppThemeProvider } from "./context/AppThemeProvider";
import { usePortal } from "./context/PortalContext";
import SuperAdminApp from "./routes/SuperAdminApp";
import TenantApp from "./routes/TenantApp";

import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

export default function App() {

  const portal = usePortal();

  if (!portal?.type) return <div>Invalid or loading portal...</div>;

  return (
        <AppThemeProvider>
                {portal.type === 'superadmin' ? <SuperAdminApp /> : <TenantApp />}
        </AppThemeProvider>
)
}
