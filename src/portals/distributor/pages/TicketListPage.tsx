// import {
//   Table,
//   Text,
//   Group,
//   Badge,
//   Button,
//   ScrollArea,
//   TextInput,
//   Select,
//   Container,
//   Anchor,
// } from '@mantine/core';
// import { IconSearch, IconEye } from '@tabler/icons-react';
// import { useState, useMemo } from 'react';
// import dayjs from 'dayjs';
// import { useDistributorTickets } from '../hooks/supportTicket.hooks';
// import { useNavigate } from 'react-router';

// export default function DistributorTicketTable() {
//   const navigate = useNavigate();
//   const { data: tickets, isLoading } = useDistributorTickets();
//   const [search, setSearch] = useState('');
//   const [status, setStatus] = useState<string | null>(null);
//   console.log(tickets);

//   // const filtered = useMemo(() => {
//   //   if (!tickets) return [];
//   //   return tickets.filter((ticket) => {
//   //     const matchSearch =
//   //       ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
//   //       ticket.description.toLowerCase().includes(search.toLowerCase()) ||
//   //       ticket.id.toLowerCase().includes(search.toLowerCase());

//   //     const matchStatus = status ? ticket.status === status : true;

//   //     return matchSearch && matchStatus;
//   //   });
//   // }, [tickets, search, status]);

//   return (
//     <Container size="lg">
//       <Group justify="space-between" mb="md">
//         <Text className="text-xl font-semibold">Support Tickets</Text>
//         <Group>
//           <TextInput
//             placeholder="Search by subject or ID"
//             value={search}
//             onChange={(e) => setSearch(e.currentTarget.value)}
//             leftSection={<IconSearch size={16} />}
//           />
//           {/* <Select
//             placeholder="Filter by status"
//             value={status}
//             onChange={setStatus}
//             data={['OPEN', 'IN_PROGRESS', 'CLOSED']}
//             clearable
//           /> */}
//         </Group>
//       </Group>

//       <ScrollArea>
//         <Table striped highlightOnHover withTableBorder>
//           <Table.Thead>
//             <Table.Tr>
//               <Table.Th>Ticket ID</Table.Th>
//               <Table.Th>Subject</Table.Th>
//               <Table.Th>Category</Table.Th>
//               <Table.Th>Raised By</Table.Th>
//               <Table.Th>Status</Table.Th>
//               <Table.Th>Created</Table.Th>
//               <Table.Th>Actions</Table.Th>
//             </Table.Tr>
//           </Table.Thead>

//           <Table.Tbody>
//             {tickets?.map((ticket:any) => (
//               <Table.Tr key={ticket.id}>
//                 <Table.Td>
//                   <Anchor onClick={() => navigate(`/distributor/support-ticket/list/${ticket.id}`)}>
//                     {ticket.id}
//                   </Anchor>
//                 </Table.Td>
//                 <Table.Td>{ticket.subject}</Table.Td>
//                 <Table.Td>{ticket.category}</Table.Td>
//                 <Table.Td>{ticket.userId}</Table.Td>
//                 <Table.Td>
//                   <Badge color={
//                     ticket.status === 'OPEN'
//                       ? 'yellow'
//                       : ticket.status === 'IN_PROGRESS'
//                       ? 'blue'
//                       : 'green'
//                   }>
//                     {ticket.status.replace('_', ' ')}
//                   </Badge>
//                 </Table.Td>
//                 <Table.Td>{dayjs(ticket.createdAt).format('DD MMM YYYY')}</Table.Td>
//                 <Table.Td>
//                   <Button
//                     size="xs"
//                     variant="light"
//                     onClick={() => navigate(`/distributor/support/${ticket.id}`)}
//                     leftSection={<IconEye size={14} />}
//                   >
//                     View
//                   </Button>
//                 </Table.Td>
//               </Table.Tr>
//             ))}

//             {tickets?.length === 0 && (
//               <Table.Tr>
//                 <Table.Td colSpan={7}>
//                   <Text c="dimmed">No tickets found</Text>
//                 </Table.Td>
//               </Table.Tr>
//             )}
//           </Table.Tbody>
//         </Table>
//       </ScrollArea>
//     </Container>
//   );
// }
