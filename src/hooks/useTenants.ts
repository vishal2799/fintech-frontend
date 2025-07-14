import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';

export const useTenants = () => {
  return useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      const res = await axios.get('/admin/tenants');
      return res.data.data;
    },
  });
};
