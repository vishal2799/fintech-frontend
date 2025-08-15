// export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED';

// export type TicketCategory =
//   | 'TECHNICAL'
//   | 'FINANCIAL'
//   | 'KYC'
//   | 'OTHER';

// export interface SupportTicket {
//   id: string;
//   userId: string;
//   subject: string;
//   description: string;
//   category: TicketCategory;
//   status: TicketStatus;
//   priority?: 'LOW' | 'MEDIUM' | 'HIGH';
//   attachmentUrl?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface TicketMessage {
//   id: string;
//   ticketId: string;
//   senderId: string;
//   senderRole: 'R' | 'D' | 'EMPLOYEE' | 'SUPER_ADMIN';
//   message: string;
//   attachmentUrl?: string;
//   createdAt: string;
// }

// export interface CreateMessageInput {
//   ticketId?: string;
//   message: string;
//   attachmentUrl?: string;
// }

// export interface ChangeTicketStatusInput {
//   ticketId: string;
//   status: TicketStatus;
// }
