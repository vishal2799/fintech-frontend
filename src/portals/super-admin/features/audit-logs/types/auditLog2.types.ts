// src/pages/super-admin/audit-logs/types/auditLogs.types.ts

export type AuditLog = {
  id: string;
  activity: string;
  method: string;
  module: string;
  tenantId?: string;
  createdAt: string;
};
