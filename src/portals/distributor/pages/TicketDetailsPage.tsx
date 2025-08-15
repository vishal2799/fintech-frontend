// import {
//   Badge,
//   Box,
//   Button,
//   Container,
//   FileInput,
//   Paper,
//   Stack,
//   Text,
//   Textarea,
//   Title,
// } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { useNavigate, useParams } from 'react-router';
// import {
//   useSendTicketMessage,
//   useDistributorTicket,
// } from '../hooks/supportTicket.hooks';
// import dayjs from 'dayjs';
// import { initial } from 'lodash-es';

// export default function TicketDetailPage() {
//   const { id = '' } = useParams();
//   const navigate = useNavigate();
//   const { data: ticket, isLoading } = useDistributorTicket(id);
//   const replyMutation = useSendTicketMessage();

//   const form = useForm({
//     initialValues: {
//       message: '',
//       attachment: undefined as File | undefined,
//     },
//   });

//   const handleReply = form.onSubmit(async (values) => {
//     await replyMutation.mutateAsync({
//       message: values.message,
//       attachmentUrl: values.attachment?.name,
//       ticketId: ticket?.id
//     });
//     form.reset();
// })

//   if (isLoading || !ticket) return <Text>Loading...</Text>;

//   return (
//     <Container size="lg">
//       <Box mb="md">
//         <Title order={2} mb={4}>
//           {ticket.subject}
//         </Title>
//         <Badge
//           color={
//             ticket.status === 'OPEN'
//               ? 'yellow'
//               : ticket.status === 'IN_PROGRESS'
//               ? 'blue'
//               : 'green'
//           }
//         >
//           {ticket.status}
//         </Badge>
//         <Text size="sm" c="dimmed" mt={10}>
//           {dayjs(ticket.createdAt).format('DD MMM YYYY, hh:mm A')}
//         </Text>
//         <Text mt="md">{ticket.description}</Text>
//         {ticket.attachmentUrl && (
//           <Text mt="xs">
//             📎{' '}
//             <a href={ticket.attachmentUrl} target="_blank" rel="noreferrer">
//               View Attachment
//             </a>
//           </Text>
//         )}
//       </Box>

//       <Stack mb="xl">
//         <Title order={4}>Replies</Title>
//         {ticket?.replies?.length === 0 && (
//           <Text c="dimmed">No replies yet</Text>
//         )}
//         {ticket?.replies.map((msg) => (
//           <Paper key={msg.id} p="md" shadow="xs" withBorder>
//             <Text size="sm" fw={500}>
//               {msg.senderType === 'USER' ? 'You' : msg.senderName}
//             </Text>
//             <Text size="sm" c="dimmed">
//               {dayjs(msg.createdAt).format('DD MMM YYYY, hh:mm A')}
//             </Text>
//             <Text mt={6}>{msg.message}</Text>
//             {msg.attachmentUrl && (
//               <Text mt={4}>
//                 📎{' '}
//                 <a href={msg.attachmentUrl} target="_blank" rel="noreferrer">
//                   View Attachment
//                 </a>
//               </Text>
//             )}
//           </Paper>
//         ))}
//       </Stack>

//       {ticket.status !== 'CLOSED' && (
//         <form onSubmit={handleReply}>
//           <Stack>
//             <Textarea
//               label="Reply"
//               autosize
//               minRows={3}
//               {...form.getInputProps('message')}
//             />
//             <FileInput
//               label="Optional Attachment"
//               accept="image/*,application/pdf"
//               {...form.getInputProps('attachment')}
//             />
//             <Button type="submit" loading={replyMutation.isPending}>
//               Send Reply
//             </Button>
//             <Button
//               variant="outline"
//               color="gray"
//               onClick={() => navigate('/retailer/tickets')}
//             >
//               Back to Tickets
//             </Button>
//           </Stack>
//         </form>
//       )}
//     </Container>
//   );
// }


// // import {
// //   Box,
// //   Button,
// //   Card,
// //   Divider,
// //   Group,
// //   Loader,
// //   Stack,
// //   Text,
// //   Textarea,
// //   Title,
// //   Badge,
// // } from '@mantine/core';
// // import { useForm } from '@mantine/form';
// // import { useParams } from 'react-router';
// // import { useState } from 'react';
// // import {  useChangeTicketStatus, useDistributorTicket, useSendTicketMessage } from '../hooks/supportTicket.hooks';
// // import dayjs from 'dayjs';

// // export default function DistributorTicketDetail() {
// //   const { ticketId } = useParams();
// //   const { data, isLoading } = useDistributorTicket(ticketId!);
// //   const replyMutation = useSendTicketMessage();
// //   const closeMutation = useChangeTicketStatus();

// //   const [showReplyBox, setShowReplyBox] = useState(false);

// //   const form = useForm({
// //     initialValues: { message: '' },
// //     validate: { message: (val) => (!val ? 'Message is required' : null) },
// //   });

// //   if (isLoading || !data) return <Loader />;

// //   const { ticket, messages } = data;

// //   const handleReply = (values: { message: string }) => {
// //     replyMutation.mutate(values, {
// //       onSuccess: () => {
// //         form.reset();
// //         setShowReplyBox(false);
// //       },
// //     });
// //   };

// //   const handleClose = () => {
// //     closeMutation.mutate();
// //   };

// //   return (
// //     <Box>
// //       <Title order={3}>{ticket.subject}</Title>
// //       <Group mt="xs">
// //         <Badge color="blue">{ticket.category}</Badge>
// //         <Badge color={ticket.status === 'OPEN' ? 'yellow' : ticket.status === 'IN_PROGRESS' ? 'blue' : 'green'}>
// //           {ticket.status}
// //         </Badge>
// //         <Text size="sm" c="dimmed">
// //           #{ticket.id} • {dayjs(ticket.createdAt).format('DD MMM YYYY, hh:mm A')}
// //         </Text>
// //       </Group>

// //       <Divider my="md" />

// //       <Stack>
// //         {messages.map((msg) => (
// //           <Card key={msg.id} withBorder p="md" radius="md">
// //             <Group justify="space-between">
// //               <Text fw={500}>
// //                 {msg.senderType === 'DISTRIBUTOR'
// //                   ? 'You'
// //                   : msg.senderType === 'RETAILER'
// //                   ? ticket.raisedBy.name
// //                   : msg.senderType}
// //               </Text>
// //               <Text size="xs" c="dimmed">
// //                 {dayjs(msg.createdAt).format('DD MMM YYYY, hh:mm A')}
// //               </Text>
// //             </Group>
// //             <Text mt="xs">{msg.message}</Text>
// //           </Card>
// //         ))}
// //       </Stack>

// //       <Divider my="md" />

// //       {ticket.status !== 'CLOSED' && (
// //         <>
// //           {!showReplyBox ? (
// //             <Group mt="sm">
// //               <Button onClick={() => setShowReplyBox(true)}>Reply</Button>
// //               <Button color="red" onClick={handleClose} loading={closeMutation.isPending}>
// //                 Close Ticket
// //               </Button>
// //             </Group>
// //           ) : (
// //             <form onSubmit={form.onSubmit(handleReply)}>
// //               <Textarea
// //                 label="Your reply"
// //                 autosize
// //                 minRows={3}
// //                 {...form.getInputProps('message')}
// //               />
// //               <Group mt="sm">
// //                 <Button type="submit" loading={replyMutation.isPending}>
// //                   Send Reply
// //                 </Button>
// //                 <Button variant="subtle" onClick={() => setShowReplyBox(false)}>
// //                   Cancel
// //                 </Button>
// //               </Group>
// //             </form>
// //           )}
// //         </>
// //       )}
// //     </Box>
// //   );
// // }
