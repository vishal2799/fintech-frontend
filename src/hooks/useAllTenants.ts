// hooks/useAllTenants.ts
import { useQuery } from '@tanstack/react-query';
import API from '../api/axios';

export const useAllTenants = () => {
  return useQuery({
    queryKey: ['allTenants'],
    queryFn: async () => {
      const res = await API.get('/admin/tenants/all');
      return res.data.data;
    }
  });
};
