import { Button, Group, Modal, Table, Stack, Pagination } from '@mantine/core';
import { useState } from 'react';
import { useTenantService } from '../../hooks/useTenantService';
import { TenantForm } from './TenantForm';
import type { Tenant } from '../../types/tenantTypes';
import { useSearchParams } from 'react-router';

const TenantList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const page = parseInt(searchParams.get('page') || '1');

  const { tenantsQuery, deleteTenant, updateTenant, createTenant } = useTenantService();
  const [editTenant, setEditTenant] = useState<Tenant | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  if (tenantsQuery.isLoading) return <p>Loading...</p>;

  const handlePageChange = (p: number) => {
    setSearchParams({ page: p.toString() });
  };

  return (
    <Stack>
      <Group>
        <Button onClick={() => setCreateModalOpen(true)}>+ Create Tenant</Button>
      </Group>

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenantsQuery.data!.data?.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.name}</td>
              <td>{tenant.slug}</td>
              <td>{tenant.status ?? 'ACTIVE'}</td>
              <td>
                <Group>
                  <Button size="xs" onClick={() => setEditTenant(tenant)}>Edit</Button>
                  <Button size="xs" color="red" onClick={() => deleteTenant.mutate(tenant.id)}>Delete</Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
          value={tenantsQuery.data!.page}
          onChange={handlePageChange}
          total={tenantsQuery.data!.totalPages}
        />

      {/* Create Modal */}
      <Modal
        opened={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create Tenant"
      >
        <TenantForm
          onSubmit={(data) => {
            createTenant.mutate(data);
            setCreateModalOpen(false);
          }}
          isLoading={createTenant.isPending}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        opened={!!editTenant}
        onClose={() => setEditTenant(null)}
        title="Update Tenant"
      >
        {editTenant && (
          <TenantForm
            initialValues={editTenant}
            onSubmit={(data) => {
              if (editTenant?.id) {
                updateTenant.mutate({ ...data, id: editTenant.id });
              }
              setEditTenant(null);
            }}
            isLoading={updateTenant.isPending}
          />
        )}
      </Modal>
    </Stack>
  );
};

 export default TenantList;


// import { useTenants } from '../../hooks/useTenants';

// const TenantList = () => {
//   const { data, isLoading } = useTenants();
//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Tenants</h2>
//       <table className="w-full bg-white shadow rounded">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="p-2">Name</th>
//             <th className="p-2">Slug</th>
//             <th className="p-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.data?.map((tenant: any) => (
//             <tr key={tenant.id} className="border-t">
//               <td className="p-2">{tenant.name}</td>
//               <td className="p-2">{tenant.slug}</td>
//               <td className="p-2">{tenant.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TenantList;
