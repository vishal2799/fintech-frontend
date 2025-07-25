export interface WalletBalance {
  tenantId: string;
  balance: string;      // stored as string from db
  heldAmount: string;
  updatedAt?: string;
}

export interface WalletTransaction {
  id: string;
  tenantId: string;
  type: 'CREDIT' | 'DEBIT';
  metaType: string;
  amount: string;
  description?: string;
  referenceUserId?: string;
  relatedUserId?: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  createdAt: string;
}

export interface CreditRequest {
  id: string;
  fromTenantId: string;
  amount: string;
  requestedByUserId: string;
  approvedByUserId?: string;
  remarks?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface TenantWalletSummary {
  tenantId: string;
  tenantName: string;
  balance: string;
  heldAmount: string;
}


// export interface CreditRequest {
//   id: string;
//   fromTenantId: string;
//   amount: string;
//   status: 'PENDING' | 'APPROVED' | 'REJECTED';
//   remarks?: string;
//   requestedByUserId: string;
//   approvedByUserId?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateTenantWalletPayload {
//   tenantId: string;
// }

// export interface ApproveCreditRequestPayload {
//   id: string;
// }

// export interface RejectCreditRequestPayload {
//   id: string;
//   remarks?: string;
// }

// export interface ManualTopupPayload {
//   tenantId: string;
//   amount: number;
//   description?: string;
// }

// export interface DebitWalletPayload {
//   tenantId: string;
//   amount: number;
//   description?: string;
// }

// export interface HoldWalletPayload {
//   tenantId: string;
//   amount: number;
//   description?: string;
// }

// export interface ReleaseWalletPayload {
//   tenantId: string;
//   amount: number;
//   description?: string;
// }

// export interface WalletBalance {
//   balance: string;
//   heldAmount: string;
// }

// export interface WalletTransaction {
//   id: string;
//   tenantId: string;
//   type: 'CREDIT' | 'DEBIT';
//   metaType: string;
//   amount: string;
//   status: 'SUCCESS' | 'FAILED' | 'PENDING';
//   referenceUserId?: string;
//   relatedUserId?: string;
//   description?: string;
//   createdAt: string;
// }
