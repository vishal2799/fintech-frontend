import { useQuery } from '@tanstack/react-query';
import { getAuditLogs } from './auditLogs.api';

export const useAuditLogs = (filters: any) =>
  useQuery({
    queryKey: ['audit-logs', filters],
    queryFn: () => getAuditLogs(filters),
    // keepPreviousData: true,
  });
