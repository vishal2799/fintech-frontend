export interface TenantWallet {
  balance: number;
  heldAmount: number;
}

export interface WalletTransaction {
  id: string;
  tenantId: string;
  type: 'CREDIT' | 'DEBIT' | 'HOLD' | 'RELEASE';
  metaType: string;
  amount: string;
  status: string;
  description?: string;
  createdAt: string;
}

export interface CreditRequest {
  id: string;
  fromTenantId: string;
  amount: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedByUserId: string;
  approvedByUserId?: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}