// src/pages/super-admin/audit-logs/api/auditLogs.hooks.ts

import { useQuery } from '@tanstack/react-query';
import { fetchAuditLogs, type FetchAuditLogsParams } from './auditLogs2.api';
import type { AuditLog } from '../pages/AuditLogsList';

export const useAuditLogs = (params: FetchAuditLogsParams) =>
  useQuery<{
    data: AuditLog[];
    total: number;
    page: number;
    limit: number;
  }>({
    queryKey: ['audit-logs', params],
    queryFn: () => fetchAuditLogs(params),
    // keepPreviousData: true,
  });
