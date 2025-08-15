// import { useNavigate } from 'react-router';
// import { Button, Table, Text, Badge, Group, Container } from '@mantine/core';
// import { useMySupportTickets } from '../hooks/supportTicket.hooks';
// import dayjs from 'dayjs';

// export default function TicketListPage() {
//   const navigate = useNavigate();
//   const { data: tickets = [], isLoading } = useMySupportTickets();

//   return (
//     <Container size="md">
//       <Group justify="space-between" mb="md">
//         <Text size="xl" fw={600}>
//           My Support Tickets
//         </Text>
//         <Button onClick={() => navigate('create')}>+ Create Ticket</Button>
//       </Group>

//       <Table striped withTableBorder withColumnBorders highlightOnHover>
//         <Table.Thead>
//           <Table.Tr>
//             <Table.Th>Subject</Table.Th>
//             <Table.Th>Category</Table.Th>
//             <Table.Th>Status</Table.Th>
//             <Table.Th>Created At</Table.Th>
//           </Table.Tr>
//         </Table.Thead>
//         <Table.Tbody>
//           {tickets.map((ticket) => (
//             <Table.Tr
//               key={ticket.id}
//               style={{ cursor: 'pointer' }}
//               onClick={() => navigate(ticket.id)}
//             >
//               <Table.Td>{ticket.subject}</Table.Td>
//               <Table.Td>{ticket.category}</Table.Td>
//               <Table.Td>
//                 <Badge
//                   color={
//                     ticket.status === 'OPEN'
//                       ? 'yellow'
//                       : ticket.status === 'IN_PROGRESS'
//                       ? 'blue'
//                       : 'green'
//                   }
//                 >
//                   {ticket.status.replace('_', ' ')}
//                 </Badge>
//               </Table.Td>
//               <Table.Td>{dayjs(ticket.createdAt).format('DD MMM YYYY')}</Table.Td>
//             </Table.Tr>
//           ))}
//           {tickets.length === 0 && !isLoading && (
//             <Table.Tr>
//               <Table.Td colSpan={4}>
//                 <Text c="dimmed">No tickets found</Text>
//               </Table.Td>
//             </Table.Tr>
//           )}
//         </Table.Tbody>
//       </Table>
//     </Container>
//   );
// }
