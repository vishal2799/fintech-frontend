// import api from '../../../api/axios';
// import type { PaginatedData } from '../../../types/types';
// import type { AuditLog, AuditLogFilters, AuditLogListResponse } from '../types/auditLogs.types';

// export async function fetchAuditLogs(filters: AuditLogFilters): Promise<PaginatedData<AuditLog>> {
//   const res = await api.get<AuditLogListResponse>('/logs', { params: filters })
//   return res.data.data
// }

// frontend/src/api/auditLogs.ts

import axios from '../../../api/axios';
import { type PaginatedData } from '../../../types/types'

export type AuditLog = {
  id: string
  url: string
  method: string
  module: string | null
  activity: string | null
  actorId: string | null
  actorType: string | null
  tenantId: string | null
  createdAt: string
}

export type AuditLogFilters = {
  pageIndex?: number
  pageSize?: number
  sortBy?: `${string}.${'asc' | 'desc'}`
  search?: string
}

export async function fetchAuditLogs(
  filters: AuditLogFilters
): Promise<PaginatedData<AuditLog>> {
  const res = await axios.get('/logs', { params: filters })
  return res.data.data
}
