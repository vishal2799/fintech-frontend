import axios from '../../../api/axios';
import {
  type SupportTicket,
  type TicketMessage,
  type CreateMessageInput,
  type ChangeTicketStatusInput,
} from '../types/supportTicket.types';

// export const getTicketsForDistributor = (): Promise<SupportTicket[]> => {
//   return axios.get('/support-tickets/distributors');
// };

export const getTicketsForDistributor = () =>
  axios.get('/support-tickets/distributors').then(res => res.data.data);

export const getTicketById = (id: string): Promise<SupportTicket> =>
  axios.get(`/support-tickets/${id}`).then(res => res.data.data);

export const getMessagesForTicket = (ticketId: string): Promise<TicketMessage[]> => {
  return axios.get(`/distributor/support-tickets/${ticketId}/messages`);
};

export const sendMessageForTicket = (data: CreateMessageInput): Promise<TicketMessage> => {
  return axios.post(`/support-tickets/${data.ticketId}/reply`, {
    body: data.message,
    attachmentUrl: data.attachmentUrl,
  });
};

export const changeTicketStatus = (data: ChangeTicketStatusInput): Promise<SupportTicket> => {
  return axios.patch(`/distributor/support-tickets/${data.ticketId}/status`, {
    status: data.status,
  });
};
