import { type Filters, type PaginatedData } from '../../../types/types'

export type AuditLog = {
  id: string
  url: string
  method: string
  activity: string
  module: string
  actorId: string | null
  actorType: string
  tenantId: string | null
  createdAt: string
}

export type AuditLogFilters = Filters<AuditLog>

// export type AuditLogListResponse = PaginatedData<AuditLog>

export type AuditLogListResponse = {
  success: boolean
  message: string
  data: PaginatedData<AuditLog>
  status: number
}
