import { useQuery } from "@tanstack/react-query";
import API from "../api/axios";

// hooks/usePaginatedTenants.ts
export const usePaginatedTenants = ({ page, perPage }: { page: number; perPage: number }) => {
  return useQuery({
    queryKey: ['tenants', page, perPage],
    queryFn: async () => {
      const res = await API.get('/admin/tenants', {
        params: { page, perPage }
      });
      return res.data.data;
    }
  });
};
