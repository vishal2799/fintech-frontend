// import api from '../../../api/axios';
// import type { PaginatedData } from '../../../types/types';
// import type { AuditLog, AuditLogFilters, AuditLogListResponse } from '../types/auditLogs.types';

// export async function fetchAuditLogs(filters: AuditLogFilters): Promise<PaginatedData<AuditLog>> {
//   const res = await api.get<AuditLogListResponse>('/logs', { params: filters })
//   return res.data.data
// }

// frontend/src/api/auditLogs.ts

import axios from '../../../api/axios';
import type { ExportColumn } from '../../../components/ExportMenu2';
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

export const exportAuditLogs = async (
  params: Record<string, any>
): Promise<AuditLog[]> => {
  const res = await axios.get('/logs/export', { params })
  return res.data.data // assuming wrapped in successHandler
}


export const AUDIT_LOG_EXPORT_COLUMNS: ExportColumn<AuditLog>[] = [
  { key: 'id', label: 'ID' },
  { key: 'activity', label: 'Activity' },
  { key: 'module', label: 'Module' },
  { key: 'method', label: 'Method' },
  { key: 'url', label: 'URL' },
  { key: 'actorId', label: 'Actor ID' },
  { key: 'actorType', label: 'Actor Type' },
  { key: 'tenantId', label: 'Tenant ID' },
  {
    key: 'createdAt',
    label: 'Timestamp',
    renderExport: row =>
      row.createdAt ? new Date(row.createdAt).toLocaleString() : '',
  },
]