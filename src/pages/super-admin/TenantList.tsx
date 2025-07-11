import { useTenants } from '../../hooks/useTenants';

const TenantList = () => {
  const { data, isLoading } = useTenants();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tenants</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Slug</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((tenant: any) => (
            <tr key={tenant.id} className="border-t">
              <td className="p-2">{tenant.name}</td>
              <td className="p-2">{tenant.slug}</td>
              <td className="p-2">{tenant.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantList;
