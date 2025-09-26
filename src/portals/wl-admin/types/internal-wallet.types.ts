export interface UserWalletSummary {
  id: string;
  tenantId: string;
  userName: string;
  balance: string;
  heldAmount: string;
}

export interface CreditRequest {
  id: string;
  fromTenantId: string;
  tenantName: string;
  amount: number;
  bankName: string;
  requestedByUserId: string;
  requestedByUserName: string;
  approvedByUserId?: string;
  remarks?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt?: string;
}

