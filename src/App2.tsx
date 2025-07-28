// import SuperAdminApp from './SuperAdminApp';
// import TenantApp from './TenantApp';

import { usePortal } from "./context/PortalContext";
import TenantApp from "./pages/TenantApp";

export default function App() {

  const portal = usePortal();

  if (!portal?.type) return <div>Invalid or loading portal...</div>;

  return portal.type === 'superadmin' ? <h2>Super Admin App</h2> : <TenantApp />;
}
