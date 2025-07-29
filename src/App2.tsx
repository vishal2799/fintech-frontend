import { usePortal } from "./context/PortalContext";
import SuperAdminApp from "./pages/SuperAdminApp";
import TenantApp from "./pages/TenantApp";

export default function App() {

  const portal = usePortal();

  if (!portal?.type) return <div>Invalid or loading portal...</div>;

  return portal.type === 'superadmin' ? <SuperAdminApp /> : <TenantApp />;
}
