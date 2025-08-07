import {
  type CreateSupportTicketInput,
  type SupportTicket,
  type TicketReply,
} from '../schema/supportTicket.schema';
import API from '../../../api/axios';

// Create a new ticket
export const createSupportTicket = (data: CreateSupportTicketInput) =>
  API.post<{ ticket: SupportTicket }>('/support-tickets', data).then(res => res.data.ticket);

// Get list of all tickets for current user
export const getMySupportTickets = () =>
  API.get<{ tickets: SupportTicket[] }>('/support-tickets/my').then(res => res.data.data);

// Get ticket details by ID
export const getSupportTicketById = (ticketId: string) =>
  API.get<{ ticket: SupportTicket }>(`/support-tickets/${ticketId}`).then(res => res.data.data);

// Add reply to a ticket
export const replyToSupportTicket = (ticketId: string, data: { message: string; attachment?: string }) =>
  API.post<{ reply: TicketReply }>(`/support-tickets/${ticketId}/reply`, data).then(res => res.data.reply);
