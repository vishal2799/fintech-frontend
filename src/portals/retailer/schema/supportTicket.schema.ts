import { z } from 'zod';

export const createSupportTicketSchema = z.object({
  category: z.string(),
  subject: z.string().min(3),
  description: z.string().min(5),
  attachment: z.string().url().optional(),
});

export type CreateSupportTicketInput = z.infer<typeof createSupportTicketSchema>;

export type SupportTicket = {
  id: string;
  userId: string;
  category: string;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
  attachmentUrl?: string;
  ticketResponses: TicketReply[];
};

export type TicketReply = {
  id: string;
  ticketId: string;
  senderRole: 'USER' | 'SUPPORT' | 'DISTRIBUTOR' | 'SUPER_ADMIN';
  message: string;
  createdAt: string;
  attachmentUrl?: string;
};
