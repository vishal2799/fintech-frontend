import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createSupportTicket,
  getMySupportTickets,
  getSupportTicketById,
  replyToSupportTicket,
} from '../api/supportTicket.api';
import {
  type CreateSupportTicketInput,
  type SupportTicket,
  type TicketReply,
} from '../schema/supportTicket.schema';
import { showNotification } from '@mantine/notifications';

// 🔁 Get all support tickets of current user
export const useMySupportTickets = () =>
  useQuery<SupportTicket[]>({
    queryKey: ['support-tickets'],
    queryFn: getMySupportTickets,
  });

// 📄 Get single ticket by ID
export const useSupportTicket = (ticketId: string) =>
  useQuery<SupportTicket>({
    queryKey: ['support-ticket', ticketId],
    queryFn: () => getSupportTicketById(ticketId),
    enabled: !!ticketId,
  });

// ➕ Create a new support ticket
export const useCreateSupportTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSupportTicketInput) => createSupportTicket(data),
    onSuccess: () => {
      showNotification({ message: 'Ticket created successfully', color: 'green' });
      queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
    },
    onError: () => {
      showNotification({ message: 'Failed to create ticket', color: 'red' });
    },
  });
};

// 🗨️ Reply to ticket
export const useReplyToSupportTicket = (ticketId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { message: string; attachment?: string }) =>
      replyToSupportTicket(ticketId, data),
    onSuccess: () => {
      showNotification({ message: 'Reply sent', color: 'green' });
      queryClient.invalidateQueries({ queryKey: ['support-ticket', ticketId] });
    },
    onError: () => {
      showNotification({ message: 'Failed to send reply', color: 'red' });
    },
  });
};
