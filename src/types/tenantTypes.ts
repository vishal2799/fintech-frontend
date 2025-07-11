export type Tenant = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  themeColor?: string;
  status?: 'ACTIVE' | 'INACTIVE';
};

export type CreateTenantInput = Omit<Tenant, 'id' | 'status'>;
export type UpdateTenantInput = Partial<Omit<Tenant, 'slug'>> & { id: string };
