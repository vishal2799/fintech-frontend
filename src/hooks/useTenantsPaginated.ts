// src/hooks/useTenantsPaginated.ts
import { useQuery } from '@tanstack/react-query';
import API from '../api/axios';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: string;
  logoUrl?: string;
  themeColor?: string;
}

interface PaginatedResponse {
  data: Tenant[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export const useTenantsPaginated = (page: number, perPage: number) => {
  return useQuery({
    queryKey: ['tenants', page, perPage],
    queryFn: async (): Promise<PaginatedResponse> => {
      const res = await API.get('/admin/tenants', {
        params: { page, perPage },
      });
      return res.data.data;
    },
    // keepPreviousData: true, // avoid flicker
  });
};
