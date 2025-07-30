import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/wallet.api';
import type {
  CreditWalletInput,
  DebitWalletInput,
  HoldWalletInput,
  ReleaseWalletInput,
} from '../schema/wallet.schema';
import type { CreditRequest } from '../types/wallet.types';

export const useTenantWalletSummaries = () => {
  return useQuery({
    queryKey: ['tenant-wallet-summaries'],
    queryFn: api.fetchTenantWalletSummaries,
  });
};

export const useCreditTenantWallet = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreditWalletInput) => api.creditTenantWallet(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tenant-wallet-summaries'] });
    },
  });
};

export const useDebitTenantWallet = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: DebitWalletInput) => api.debitTenantWallet(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tenant-wallet-summaries'] });
    },
  });
};

export const useHoldTenantWallet = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: HoldWalletInput) => api.holdTenantWallet(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tenant-wallet-summaries'] });
    },
  });
};

export const useReleaseTenantWallet = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: ReleaseWalletInput) => api.releaseTenantWallet(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tenant-wallet-summaries'] });
    },
  });
};

export const useAllCreditRequests = () =>
  useQuery<CreditRequest[]>({
    queryKey: ['credit-requests'],
    queryFn: api.getAllCreditRequests,
  });

export const useApproveCreditRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.approveCreditRequest(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['credit-requests'] });
    },
  });
};

export const useRejectCreditRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: string; remarks?: string }) =>
      api.rejectCreditRequest(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['credit-requests'] });
    },
  });
};


// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import * as api from '../api/wallet.api';
// import type {
//   ManualTopupInput,
//   DebitWalletInput,
//   HoldFundsInput,
//   ReleaseFundsInput,
// } from '../schema/wallet.schema';

// export const useTenantWalletSummaries = () => {
//   return useQuery({
//     queryKey: ['tenant-wallet-summaries'],
//     queryFn: api.fetchTenantWalletSummaries,
//   });
// };

// export const useTenantWalletBalance = (tenantId: string) => {
//   return useQuery({
//     queryKey: ['wallet-balance', tenantId],
//     queryFn: () => api.getTenantWalletBalance(tenantId),
//     enabled: !!tenantId,
//   });
// };

// export const useTenantWalletLedger = (tenantId: string) => {
//   return useQuery({
//     queryKey: ['wallet-ledger', tenantId],
//     queryFn: () => api.getTenantWalletLedger(tenantId),
//     enabled: !!tenantId,
//   });
// };

// export const useManualTopupWallet = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: ManualTopupInput) => api.manualTopupWallet(payload),
//     onSuccess: (_, { tenantId }) => {
//       qc.invalidateQueries({ queryKey: ['wallet-balance', tenantId] });
//       qc.invalidateQueries({ queryKey: ['wallet-ledger', tenantId] });
//     },
//   });
// };

// export const useDebitWallet = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: DebitWalletInput) => api.debitTenantWallet(payload),
//     onSuccess: (_, { tenantId }) => {
//       qc.invalidateQueries({ queryKey: ['wallet-balance', tenantId] });
//       qc.invalidateQueries({ queryKey: ['wallet-ledger', tenantId] });
//     },
//   });
// };

// export const useHoldWalletFunds = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: HoldFundsInput) => api.holdTenantFunds(payload),
//     onSuccess: (_, { tenantId }) => {
//       qc.invalidateQueries({ queryKey: ['wallet-balance', tenantId] });
//       qc.invalidateQueries({ queryKey: ['wallet-ledger', tenantId] });
//     },
//   });
// };

// export const useReleaseWalletFunds = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: ReleaseFundsInput) => api.releaseTenantFunds(payload),
//     onSuccess: (_, { tenantId }) => {
//       qc.invalidateQueries({ queryKey: ['wallet-balance', tenantId] });
//       qc.invalidateQueries({ queryKey: ['wallet-ledger', tenantId] });
//     },
//   });
// };

// // Optional: Credit Request management

// export const useCreditRequests = () => {
//   return useQuery({
//     queryKey: ['wallet-credit-requests'],
//     queryFn: api.getAllCreditRequests,
//   });
// };

// export const useApproveCreditRequest = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (id: string) => api.approveCreditRequest(id),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ['wallet-credit-requests'] });
//     },
//   });
// };

// export const useRejectCreditRequest = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, remarks }: { id: string; remarks?: string }) =>
//       api.rejectCreditRequest(id, remarks),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ['wallet-credit-requests'] });
//     },
//   });
// };



// // // src/pages/super-admin/wallet/api/wallet.hooks.ts
// // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // import * as api from './wallet.api';
// // import type { CreditRequest } from '../types/wallet.types';

// // export const useCreditRequests = () =>
// //   useQuery<CreditRequest[]>({
// //     queryKey: ['credit-requests'],
// //     queryFn: api.getCreditRequests,
// //   });

// // export const useApproveRequest = () => {
// //   const qc = useQueryClient();
// //   return useMutation({
// //     mutationFn: api.approveRequest,
// //     onSuccess: () => qc.invalidateQueries({ queryKey: ['credit-requests'] }),
// //   });
// // };

// // export const useRejectRequest = () => {
// //   const qc = useQueryClient();
// //   return useMutation({
// //     mutationFn: api.rejectRequest,
// //     onSuccess: () => qc.invalidateQueries({ queryKey: ['credit-requests'] }),
// //   });
// // };
