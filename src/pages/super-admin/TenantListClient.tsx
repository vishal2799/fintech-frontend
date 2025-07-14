// pages/super-admin/TenantListClient.tsx
import { ClientTable } from '../../components/table/ClientTable';
import { useTenants } from '../../hooks/useTenants';
import { columns } from './tenant.columns'; // define once and reuse

export default function TenantListClient() {
  const { data = [], isLoading } = useTenants(); // Loads all at once

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <ClientTable data={data} columns={columns} />
    </div>
  );
}
