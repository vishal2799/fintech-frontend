// import {
//   getTicketsForDistributor,
//   getTicketById,
//   getMessagesForTicket,
//   sendMessageForTicket,
//   changeTicketStatus,
// } from '../api/supportTicket.api';
// import {
//   type CreateMessageInput,
//   type ChangeTicketStatusInput,
//   type SupportTicket,
//   type TicketMessage,
// } from '../types/supportTicket.types';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { notifications } from '@mantine/notifications';

// // Fetch all tickets
// export const useDistributorTickets = () => {
//   return useQuery({
//     queryKey: ['distributor-tickets'],
//     queryFn: getTicketsForDistributor,
//   });
// };

// // Fetch single ticket by ID
// export const useDistributorTicket = (ticketId: string) => {
//   return useQuery<SupportTicket>({
//     queryKey: ['distributor-ticket', ticketId],
//     queryFn: () => getTicketById(ticketId),
//     enabled: !!ticketId,
//   });
// };

// // Fetch messages for a ticket
// export const useTicketMessages = (ticketId: string) => {
//   return useQuery<TicketMessage[]>({
//     queryKey: ['ticket-messages', ticketId],
//     queryFn: () => getMessagesForTicket(ticketId),
//     enabled: !!ticketId,
//   });
// };

// // Send a message in a ticket
// export const useSendTicketMessage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (input: CreateMessageInput) => sendMessageForTicket(input),
//     onSuccess: (data, variables) => {
//       notifications.show({
//         title: 'Message sent',
//         message: 'Your message was posted successfully.',
//         color: 'green',
//       });
//       queryClient.invalidateQueries({ queryKey: ['ticket-messages', variables.ticketId] });
//     },
//     onError: () => {
//       notifications.show({
//         title: 'Failed to send message',
//         message: 'Please try again later.',
//         color: 'red',
//       });
//     },
//   });
// };

// // Change status (e.g., to Closed)
// export const useChangeTicketStatus = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (input: ChangeTicketStatusInput) => changeTicketStatus(input),
//     onSuccess: (data, variables) => {
//       notifications.show({
//         title: 'Ticket updated',
//         message: `Status changed to ${data.status}`,
//         color: 'green',
//       });
//      queryClient.invalidateQueries({ queryKey: ['distributor-ticket', variables.ticketId] });
//      queryClient.invalidateQueries({ queryKey: ['distributor-tickets'] });
//     },
//     onError: () => {
//       notifications.show({
//         title: 'Failed to change status',
//         message: 'Please try again later.',
//         color: 'red',
//       });
//     },
//   });
// };
