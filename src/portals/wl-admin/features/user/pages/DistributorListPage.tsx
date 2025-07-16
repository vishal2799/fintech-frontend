// src/pages/wl-admin/DistributorListPage.tsx
import { useNavigate } from 'react-router';
import { useDistributors, useDeleteDistributor } from '../api/distributors.hooks';
import { notifications } from '@mantine/notifications';
import { ClientTable } from '../../../../../components/ClientTable';

export default function DistributorListPage() {
  const navigate = useNavigate();
  const { data = [] } = useDistributors();
  const deleteMutation = useDeleteDistributor();

  const handleDelete = async (row: any) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteMutation.mutateAsync(row.id);
      notifications.show({ message: 'Deleted', color: 'red' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Delete failed', color: 'red' });
    }
  };

  return (
    <ClientTable
      title="Distributors"
      data={data}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'mobile', label: 'Mobile' },
        { key: 'status', label: 'Status', type: 'badge' },
      ]}
      searchFields={['name', 'email', 'mobile']}
      onEdit={(row) => navigate(`/wl-admin/distributors/${row.id}/edit`)}
      onDelete={handleDelete}
    />
  );
}


// // src/pages/wl-admin/DistributorListPage.tsx
// import {
//   Badge,
//   Button,
//   Container,
//   Group,
//   Loader,
//   Table,
//   Title,
// } from '@mantine/core';
// import { useNavigate } from 'react-router';
// import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
// import {
//   useDistributors,
//   useDeleteDistributor,
// } from '../api/distributors.hooks';
// import { notifications } from '@mantine/notifications';

// export default function DistributorListPage() {
//   const navigate = useNavigate();
//   const { data = [], isLoading } = useDistributors();
//   const deleteMutation = useDeleteDistributor();

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this user?')) return;
//     try {
//       await deleteMutation.mutateAsync(id);
//       notifications.show({ message: 'Deleted', color: 'red' });
//     } catch (err: any) {
//       notifications.show({ message: err.message || 'Delete failed', color: 'red' });
//     }
//   };

//   if (isLoading) return <Loader />;

//   return (
//     <Container size="lg">
//       <Group justify="space-between" mb="md">
//         <Title order={2}>Distributors</Title>
//         <Button leftSection={<IconPlus size={16} />} onClick={() => navigate('/wl-admin/distributors/create')}>
//           Add
//         </Button>
//       </Group>

//       <Table striped withTableBorder withColumnBorders>
//         <Table.Thead>
//           <Table.Tr>
//             <Table.Th>Name</Table.Th>
//             <Table.Th>Email</Table.Th>
//             <Table.Th>Mobile</Table.Th>
//             <Table.Th>Status</Table.Th>
//             <Table.Th>Actions</Table.Th>
//           </Table.Tr>
//         </Table.Thead>
//         <Table.Tbody>
//           {data.map((u: any) => (
//             <Table.Tr key={u.id}>
//               <Table.Td>{u.name}</Table.Td>
//               <Table.Td>{u.email}</Table.Td>
//               <Table.Td>{u.mobile}</Table.Td>
//               <Table.Td>
//                 <Badge color={u.status === 'ACTIVE' ? 'green' : 'red'}>{u.status}</Badge>
//               </Table.Td>
//               <Table.Td>
//                 <Group gap="xs">
//                   <Button
//                     size="xs"
//                     variant="light"
//                     onClick={() => navigate(`/wl-admin/distributors/${u.id}/edit`)}
//                     leftSection={<IconEdit size={14} />}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     size="xs"
//                     variant="light"
//                     color="red"
//                     onClick={() => handleDelete(u.id)}
//                     leftSection={<IconTrash size={14} />}
//                   >
//                     Delete
//                   </Button>
//                 </Group>
//               </Table.Td>
//             </Table.Tr>
//           ))}
//         </Table.Tbody>
//       </Table>
//     </Container>
//   );
// }
