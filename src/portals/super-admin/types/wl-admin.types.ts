export type WLAdminStatus = 'ACTIVE' | 'LOCKED' | 'BLOCKED';

export interface WLAdmin {
  id: string;
  name: string;
  email: string;
  mobile: string;
  tenantId: string;
  status: WLAdminStatus;
  createdAt?: string;
  updatedAt?: string;
}
