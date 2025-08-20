// src/portals/superadmin/types/serviceRuleType.types.ts
export interface ServiceRuleType {
  id: string;            // UUID
  serviceId: string;     // UUID (FK → services.id)
  serviceName: string;
  code: string;          // e.g. "dmt_charge"
  name: string;          // e.g. "DMT Charge"
  description?: string;
  isActive: boolean;
  createdAt: string;     // ISO dates (as returned by API)
  updatedAt: string;
}

export interface ServiceSummary {
  id: string;
  code: string;
  name: string;
}

export interface ServiceRuleTypeWithService extends ServiceRuleType {
  service?: ServiceSummary;
}
