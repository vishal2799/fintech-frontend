export type TenantStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  themeColor?: string;
  status: TenantStatus;
}

export type CreateTenantInput = Omit<Tenant, 'id' | 'status'>;
export type UpdateTenantInput = Partial<Omit<Tenant, 'slug'>> & { id: string };