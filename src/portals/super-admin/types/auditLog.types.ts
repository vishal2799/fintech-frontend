export type AuditLog = {
  id: string;
  tenantId: string | null;
  userId: string | null;
  url: string;
  method: string;
  module: string;
  activity: string;
  params: string;
  query: string;
  payload: string;
  response: string;
  createdAt: string;
};

export type GetAuditLogsResponse = {
  data: AuditLog[];
  total: number;
};
