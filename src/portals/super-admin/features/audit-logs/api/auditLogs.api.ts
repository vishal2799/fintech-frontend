import axios from '../../../../../api/axios';
import type { GetAuditLogsResponse } from '../types/auditLog.types';

type Filters = {
  page: number;
  limit: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
  module?: string;
  startDate?: string;
  endDate?: string;
};

export const getAuditLogs = async (filters: Filters): Promise<GetAuditLogsResponse> => {
  const res = await axios.get('/logs', { params: filters });
  return res.data.data;
};
