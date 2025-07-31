import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWLServices, updateWLServices } from '../api/wl-services.api';
import { notifications } from '@mantine/notifications';

export const useWLServices = () => {
  return useQuery({
    queryKey: ['wl-services'],
    queryFn: getWLServices,
  });
};

export const useUpdateWLServices = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWLServices,
    onSuccess: () => {
      notifications.show({ message: 'Services updated', color: 'green' });
      queryClient.invalidateQueries({ queryKey: ['wl-services'] });
    },
    onError: (err: any) => {
      notifications.show({ message: err.message || 'Update failed', color: 'red' });
    },
  });
};
