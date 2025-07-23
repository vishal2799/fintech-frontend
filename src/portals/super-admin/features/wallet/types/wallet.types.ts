// src/pages/super-admin/wallet/types/wallet.types.ts
export interface CreditRequest {
  id: string;
  fromTenantId: string;
  toUserId: string;
  requestedByUserId: string;
  amount: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  remarks?: string;
  approvedByUserId?: string;
  createdAt?: string;
  updatedAt?: string;
}
