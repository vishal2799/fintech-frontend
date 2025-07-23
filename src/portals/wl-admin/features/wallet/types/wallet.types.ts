// src/pages/tenant/wallet/types/wallet.types.ts

export type WalletBalance = {
  balance: number;
  heldAmount: number;
};

export type WalletTransaction = {
  id: string;
  tenantId: string;
  type: 'CREDIT' | 'DEBIT' | 'HOLD' | 'UNHOLD';
  metaType: 'FUND_TOPUP' | 'SERVICE_PURCHASE' | 'ADJUSTMENT' | string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  referenceUserId?: string;
  relatedUserId?: string;
  description?: string;
  createdAt: string;
};

export type WalletCreditRequest = {
  id: string;
  fromTenantId: string;
  amount: number;
  requestedByUserId: string;
  approvedByUserId?: string;
  remarks?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
};
