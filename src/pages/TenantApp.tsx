import { usePortal } from "../context/PortalContext";

export default function TenantApp() {
  const { tenant } = usePortal();
  if (!tenant) return <div>Loading tenant...</div>;

  return (
    <div>
      <h2>Tenant Portal</h2>
      <p>Tenant Name: {tenant.name}</p>
      <p>Tenant ID: {tenant.id}</p>
    </div>
  );
}
