import { useQuery } from "@tanstack/react-query";
import API from "../api/axios";

type TenantSortKey = 'name' | 'slug' | 'status' | 'createdAt';

// hooks/useAdvancedTenants.ts
export const useAdvancedTenants = ({ page, perPage, search, sortBy, sortDir }: { page: number; perPage: number, search: string, sortBy: TenantSortKey, sortDir: string}) => {
  return useQuery({
    queryKey: ['tenants', page, perPage, search, sortBy, sortDir],
    queryFn: async () => {
      const res = await API.get('/admin/tenants/advanced', {
        params: { page, perPage, search, sortBy, sortDir }
      });
      return res.data.data;
    }
  });
};
