import axios from '../../../../../api/axios';
import type { AuditLog } from '../pages/AuditLogsList';

export type FetchAuditLogsParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  module?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
};

export const fetchAuditLogs = async (
  params: FetchAuditLogsParams = {}
): Promise<PaginatedResponse<AuditLog>> => {
  const res = await axios.get('/logs', { params });
  return res.data.data;
};
