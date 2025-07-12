import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTenants,
  createTenant,
  updateTenant,
  deleteTenant,
} from '../services/tenantApi';
// import type {  CreateTenantInput, UpdateTenantInput } from '../types/tenantTypes';
import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'react-router';

export const useTenantService = () => {
  const queryClient = useQueryClient();

  const [params] = useSearchParams();
  const page = parseInt(params.get('page') || '1');

  const tenantsQuery =  useQuery({
    queryKey: ['tenants', page],
    queryFn: () => fetchTenants({ page }),
    // keepPreviousData: true,
  });

  // const [params]   = useSearchParams();
  // const page       = Number(params.get('page') ?? 1);
  // const perPage    = 10;

  // const tenantsQuery = useQuery({
  //   queryKey: ['tenants'],
  //   queryFn: fetchTenants,
  // });

  // const tenantsQuery = useQuery({
  //   queryKey: ['tenants', page],
  //   queryFn: async () => {
  //     const { data } = await axios.get('/admin/tenants', {
  //       params: { page, perPage },
  //     });
  //     return data.data; // response wrapper
  //   },
  //   keepPreviousData: true,
  // });

  const create = useMutation({
    mutationFn: createTenant,
    onSuccess: (data) => {
      notifications.show({ message: 'Tenant created successfully', color: 'green' });
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      console.log(data);
    },
    onError: (err: any) => {
        console.log(err.response);
      notifications.show({ message: err.response?.data?.message || 'Failed to create tenant', color: 'red' });
    },
  });

  const update = useMutation({
    mutationFn: updateTenant,
    onSuccess: () => {
      notifications.show({ message: 'Tenant updated successfully', color: 'green' });
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
    onError: (err: any) => {
      notifications.show({ message: err.response?.data?.message || 'Failed to update tenant', color: 'red' });
    },
  });

  const remove = useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => {
      notifications.show({ message: 'Tenant deleted', color: 'green' });
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
    onError: (err: any) => {
      notifications.show({ message: err.response?.data?.message || 'Failed to delete tenant', color: 'red' });
    },
  });

  return {
    tenantsQuery,
    createTenant: create,
    updateTenant: update,
    deleteTenant: remove,
  };
};
