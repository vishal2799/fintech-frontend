import { usePortal } from "./context/PortalContext";
import SuperAdminApp from "./pages/SuperAdminApp";
import TenantApp from "./pages/TenantApp";

import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

export default function App() {

  const portal = usePortal();

  if (!portal?.type) return <div>Invalid or loading portal...</div>;

  return portal.type === 'superadmin' ? <SuperAdminApp /> : <TenantApp />;
}
